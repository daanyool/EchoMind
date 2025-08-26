import torch
from torch import nn
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch.nn.functional as F

app = Flask(__name__)
CORS(app)

# Load tokenizer and models
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load type classification model
type_model_path = "./bert-anxiety-type-model"
type_model = AutoModelForSequenceClassification.from_pretrained(type_model_path).to(device)
type_model.eval()

# Load severity classification model
severity_model_path = "./bert-anxiety-severity-model"
severity_model = AutoModelForSequenceClassification.from_pretrained(severity_model_path).to(device)
severity_model.eval()

type_labels = {
    0: "Generalized Anxiety Disorder",
    1: "Obsessive-compulsive Disorder",
    2: "Panic Disorder",
    3: "Post-Traumatic Stress Disorder",
    4: "Separation Anxiety Disorder",
    5: "Social Anxiety Disorder"
}

severity_levels = {
    0: "Low",
    1: "Mild",
    2: "Moderate",
    3: "Severe",
}

severity_percent_ranges = {
    0: (10,20),
    1: (20,40),
    2: (40,60),
    3: (60,90)
}

conditionInfo = [
  {
    "id": "PTSD",
    "name": "Post-Traumatic Stress Disorder",
    "definition":"Post-Traumatic Stress Disorder (PTSD) is a mental health condition triggered by experiencing or witnessing a traumatic event. It causes persistent emotional, cognitive, physical, and behavioral symptoms that interfere with daily life. With appropriate care, individuals can manage symptoms and improve their quality of life.",
    "stages": {
        "Low": {
        "Emotional":"The person experiences mild, fleeting intrusive thoughts or brief anxiety that resolves quickly. Minor distress may occur when encountering triggers. Fear and sadness are short-lived and manageable.",
        "Behavioral":"There may be occasional avoidance or hypervigilance without disrupting daily routines. The person continues to function normally in social, work, and personal activities. Subtle restlessness or minor safety-checking habits might appear.",
        "Cognitive":"Intrusive thoughts are recognized as irrational and easily dismissed. Concentration remains steady with little to no cognitive disruption. Mild negative thoughts occasionally surface but don’t linger.",
        "Physical":"Minor anxiety symptoms like a slightly increased heart rate or muscle tension may occur. Light, occasional sleep disruptions happen but resolve quickly. Physical symptoms improve without lasting effects."
        },
        "Mild": {
        "Emotional":"The person feels more frequent distress and fear when reminded of the trauma. Sadness and guilt appear more often, creating emotional discomfort. A growing fear of danger in certain situations begins to develop.",
        "Behavioral":"Frequent avoidance and heightened awareness consume more mental energy. Routine tasks are still completed but with noticeable effort. Occasional coping rituals or safety-checking behaviors might emerge.",
        "Cognitive":"Intrusive thoughts become harder to dismiss, and worry or self-blame increase. A negative outlook on personal safety and trust begins to form. The individual may struggle to maintain positive thoughts.",
        "Physical":"Anxiety symptoms like racing heart and muscle tension become more noticeable. Sleep disturbances such as nightmares and night sweats occur more often. Physical fatigue affects focus, mood, and energy."
        },
        "Moderate": {
        "Emotional":"Persistent anxiety and chronic sadness take hold, leaving the person emotionally exhausted. Feelings of numbness and guilt intensify over time. There is a constant fear of potential harm or danger.",
        "Behavioral":"Compulsive checking and avoidance behaviors start interfering with daily life. The person withdraws socially to avoid potential triggers. Routine tasks feel overwhelming and difficult to manage.",
        "Cognitive":"Intrusive memories become vivid and uncontrollable, causing significant distress. The person struggles to distinguish between irrational fears and reality. Shame and hopelessness deeply affect self-esteem.",
        "Physical":"Chronic fatigue and stress-related pain increase in severity. Severe sleep problems cause constant tiredness and emotional strain. Physical health begins to deteriorate from prolonged tension and anxiety."
        },
        "Severe": {
        "Emotional":"Overwhelming fear and emotional numbness dominate everyday experiences. Intense guilt and recurring thoughts of self-harm appear. Constant feelings of despair make coping extremely difficult.",
        "Behavioral":"The person completely withdraws from social interactions and public spaces. They become fully dependent on rituals or coping behaviors for daily survival. Normal activities, like eating or leaving the house, become nearly impossible.",
        "Cognitive":"Persistent and vivid flashbacks blur the lines between past and present. An extreme distrust of others develops, and feelings of safety vanish. The person experiences complete emotional disconnection and dissociation.",
        "Physical":"Chronic exhaustion and serious health problems from stress are constant. Severe sleep disturbances and nightmares leave the person fatigued and restless. Persistent muscle tension and physical pain severely affect daily functioning."
        }
    },
    "mainSymptoms": [
        "Unwanted intrusive thoughts or flashbacks of the traumatic event, creating the sensation that it is happening again.",
        "Constant hypervigilance, being easily startled, or remaining overly alert to potential threats in the environment.",
        "Persistent avoidance of places, people, or situations that remind the individual of the traumatic experience.",
        "Ongoing negative mood, including feelings of guilt, shame, hopelessness, and emotional detachment from others.",
        "Sleep disturbances such as difficulty falling asleep, frequent nightmares, or waking in a panic due to trauma-related anxiety.",
        "Emotional numbing, where the person feels emotionally distant or struggles to experience positive emotions."
    ],
  },
  {
    "id": "PD",
    "name": "Panic Disorder",
    "definition":"Panic Disorder (PD) is a mental health condition characterized by recurrent, unexpected panic attacks — sudden episodes of intense fear or discomfort that peak within minutes. These episodes involve physical and cognitive symptoms, such as a pounding heart, sweating, trembling, shortness of breath, chest pain, nausea, dizziness, chills or heat sensations, and fear of losing control or dying. Unlike other anxiety disorders, panic attacks in PD occur unpredictably and are not necessarily linked to a specific trigger. This often leads to a fear of having another attack, resulting in avoidance behaviors and sometimes agoraphobia. The disorder typically begins in late adolescence or early adulthood and is more common in women. If left untreated, PD can severely impair social, academic, and occupational functioning.",
    "stages": {
        "Low": {
        "Emotional":"The individual experiences quick moments of fear and slight nervousness, occasionally feeling uneasy.",
        "Behavioral":"The person acts normally most of the time but may appear alert in certain situations without actively avoiding them.",
        "Cognitive":"There are minor worries about bodily sensations, and the person may occasionally overthink harmless symptoms.",
        "Physical":"Physical symptoms include light chest tightness, mild heart palpitations, slight sweating, or dizziness."
        },
        "Mild": {
        "Emotional":"Panic episodes happen occasionally, and the person may feel nervous before events or stressful situations.",
        "Behavioral":"The individual begins avoiding a few places and makes slight adjustments to routines to prevent discomfort.",
        "Cognitive":"There is a growing worry about experiencing the next panic attack, and the person becomes more attentive to bodily signs.",
        "Physical":"Symptoms include a fast heartbeat, chest tightness, shortness of breath, and light shaking."
        },
        "Moderate": {
        "Emotional":"The person frequently experiences panic attacks and lives in a state of ongoing anxiety.",
        "Behavioral":"Multiple places, activities, or situations are avoided, and the individual may skip work, school, or social events.",
        "Cognitive":"There is an intense fear of health problems, leading to excessive monitoring of bodily sensations.",
        "Physical":"Physical symptoms include strong heart palpitations, chest pain, dizziness, shaking, and nausea."
        },
        "Severe": {
        "Emotional":"The person feels like they are dying or going crazy during panic attacks and lives with a constant sense of deep fear.",
        "Behavioral":"They avoid almost everything, refuse to leave the house alone, and stay isolated.",
        "Cognitive":"There is a persistent, overwhelming fear, a sense of unreality, and difficulty thinking clearly.",
        "Physical":"Daily panic attacks occur with chest pain, breathing difficulties, near fainting, and intense physical distress."
        }
    },
    "mainSymptoms": [
        "Recurrent, unexpected panic attacks that peak within minutes, often without a clear trigger.",
        "Physical symptoms such as heart palpitations, shortness of breath, chest pain, dizziness, and excessive sweating during panic attacks.",
        "An intense fear of losing control over one's body or mind, or going crazy during an attack.",
        "A powerful fear of dying or experiencing a life-threatening medical event, like a heart attack, during a panic episode.",
        "Persistent worry about having future panic attacks, leading to anxiety about upcoming situations.",
        "Behavioral avoidance of places, activities, or situations where panic attacks were previously experienced, limiting daily life and social interactions."
    ],
  },
  {
    "id": "OCD",
    "name":"Obsessive-compulsive Disorder",
    "definition":"Obsessive-Compulsive Disorder (OCD) is a mental health condition characterized by persistent, intrusive thoughts (obsessions) and repetitive behaviors (compulsions) performed to reduce anxiety. Obsessions are unwanted, distressing, and often irrational, while compulsions are repetitive actions intended to neutralize these thoughts or prevent feared outcomes. Without treatment, OCD can severely impact daily life, relationships, and overall functioning. Symptoms typically worsen under stress, making early diagnosis and management crucial.",
    "stages": {
        "Low": {
        "Emotional":"In this stage, individuals experience occasional, mild intrusive thoughts that cause slight discomfort, such as brief worries about leaving appliances on.",
        "Behavioral":"Behaviorally, individuals may exhibit mild repetition, such as checking things once or twice, occasional reassurance-seeking, and light checking behaviors that do not disrupt their routines.",
        "Cognitive":"Cognitively, they are able to recognize irrational thoughts and dismiss them easily, with little anxiety affecting their daily functioning.",
        "Physical":"Physically, individuals may experience minor restlessness, light muscle tension from occasional anxiety, and a slight increase in focus on trivial tasks.",
        },
        "Mild": {
        "Emotional":"In the mild stage, individuals experience increased anxiety during intrusive thoughts, such as a fear of contamination or harm, which creates heightened discomfort.",
        "Behavioral":"Behaviorally, individuals may engage in frequent checking rituals, counting, or cleaning behaviors, and avoid certain situations or objects to reduce anxiety.",
        "Cognitive":"Cognitively, they experience a strong urge to perform rituals to prevent harm, accompanied by excessive worry about potential negative outcomes.",
        "Physical":"Physically, individuals may experience tension headaches, mild fatigue from compulsions, and occasional heart rate increases during heightened anxiety.",
        },
        "Moderate": {
        "Emotional":"Emotionally, individuals experience constant anxiety and distress due to obsessive thoughts, with an overwhelming fear of losing control over their behavior.",
        "Behavioral":"Behaviorally, rituals take up significant time, with frequent checking, counting, or excessive cleaning that may last for hours, significantly disrupting daily life.",
        "Cognitive":"Cognitively, individuals struggle to distinguish rational thoughts from irrational ones, often experiencing persistent fears of catastrophe when rituals are not performed.",
        "Physical":"Physically, individuals may experience fatigue, muscle pain, digestive issues related to stress, and headaches from constant worrying and anxiety.",
        },
        "Severe": {
        "Emotional":"In the severe stage, individuals experience overwhelming distress and a constant fear of irreversible consequences if their rituals are missed, leading to emotional paralysis.",
        "Behavioral":"Behaviorally, individuals may become completely dependent on rituals to function, avoiding social settings, and relying entirely on compulsions to maintain a sense of control.",
        "Cognitive":"Cognitively, individuals hold persistent irrational beliefs and experience severe anxiety when rituals are interrupted or delayed, leading to deep psychological distress.",
        "Physical":"Physically, individuals experience severe fatigue, physical exhaustion, chronic pain from repetitive actions, and gastrointestinal distress due to the stress caused by obsessive thoughts and compulsions.",
        }
    },
    "mainSymptoms": [
        "Recurrent, unwanted, and distressing intrusive thoughts or urges that cause anxiety or discomfort.",
        "Repetitive compulsive behaviors or mental acts (such as washing, checking, or counting) performed to reduce anxiety or prevent a feared event.",
        "Time-consuming rituals that take up hours of the day, severely disrupting daily activities, work, or social interactions.",
        "Obsessive thoughts and compulsive actions that cause significant distress or difficulty in personal, social, or occupational functioning.",
        "An intense fear that something terrible will happen if rituals aren’t completed or if obsessive thoughts aren’t controlled.",
        "Difficulty controlling thoughts or behaviors, even when recognizing they’re excessive, leading to heightened anxiety and distress."
    ],
  },
  {
    "id": "GAD",
    "name": "Generalized Anxiety Disorder",
    "definition":"Generalized Anxiety Disorder (GAD) is a mental health condition characterized by excessive, uncontrollable worry about various aspects of life, such as performance, health, or social interactions. This worry is often disproportionate and persistent, leading to emotional, cognitive, and physical distress. GAD can significantly affect daily functioning and quality of life, especially without treatment, and symptoms typically worsen under stress.",
    "stages": {
        "Low": {
        "Emotional":"In this stage, individuals experience occasional worry accompanied by mild apprehension and slight tension, typically related to minor stressors in daily life.",
        "Behavioral":"Behaviorally, individuals maintain normal functioning with minimal impact on daily tasks, though they may occasionally avoid minor stressors or situations that cause discomfort.",
        "Cognitive":"Cognitively, individuals experience mild disturbance with occasional racing thoughts and minimal mental fatigue, which does not greatly interfere with their functioning.",
        "Physical":"Physically, individuals may experience mild muscle tension, slight headaches, and minor sleep disruption that does not significantly affect their overall well-being.",
        },
        "Mild": {
        "Emotional":"Emotionally, individuals experience frequent worry with heightened sensitivity, anticipatory anxiety, and a persistent sense of nervousness about future events.",
        "Behavioral":"Behaviorally, individuals may slightly avoid stress-inducing situations, engage in reduced social interaction, and experience procrastination in completing tasks or making decisions.",
        "Cognitive":"Cognitively, they have difficulty concentrating, may experience occasional intrusive thoughts, and often feel mentally foggy or unclear about how to approach tasks.",
        "Physical":"Physically, individuals may experience restlessness, mild sleep disturbances, and an increased heart rate as their anxiety levels rise in response to stressors.",
        },
        "Moderate": {
        "Emotional":"In the moderate stage, individuals experience constant worry, irritability, emotional instability, and frequent feelings of unease that interfere with their ability to function normally.",
        "Behavioral":"Behaviorally, individuals show increased avoidance behaviors, have difficulty performing daily tasks, and experience a noticeable decline in their productivity and ability to complete tasks.",
        "Cognitive":"Cognitively, individuals experience frequent intrusive thoughts, significant mental fatigue, and difficulty focusing or making decisions, which hampers their cognitive clarity.",
        "Physical":"Physically, individuals may have persistent muscle tension, chronic fatigue, frequent headaches, and gastrointestinal distress, which are often exacerbated by the ongoing worry.",
        },
        "Severe": {
        "Emotional":"In the severe stage, individuals experience overwhelming worry, persistent dread, and feelings of helplessness or hopelessness that can paralyze their ability to function effectively.",
        "Behavioral":"Behaviorally, individuals experience severe functional impairment, leading to social isolation and a drastic decline in performance at work or in social settings, further deepening their distress.",
        "Cognitive":"Cognitively, individuals have obsessive, intrusive thoughts, experience significant mental fog, and may engage in compulsive behaviors as a coping mechanism to manage anxiety.",
        "Physical":"Physically, individuals endure severe muscle tension, chronic exhaustion, insomnia, and severe gastrointestinal issues, which are exacerbated by the constant state of anxiety.",
        },
    },
    "mainSymptoms": [
        "Excessive, uncontrollable worry about everyday aspects of life, such as work, health, or social interactions.",
        "Restlessness, fatigue, difficulty concentrating, irritability, muscle tension, and sleep disturbances.",
        "Feelings of anxiety that interfere with daily tasks and relationships, often disproportionate to the actual situation.",
        "Difficulty relaxing and a persistent sense of being 'on edge' or uneasy.",
        "Worries that are hard to control and cause significant distress or impairment in social, occupational, or other important areas of life.",
        "Physical symptoms such as headaches, stomach discomfort, and tightness in the chest due to constant worry.",
    ],
  },
  {
    "id": "SAD",
    "name": "Separation Anxiety Disorder",
    "definition":"Separation Anxiety Disorder (SAD) is a condition where individuals experience excessive fear or anxiety about being separated from close attachment figures. This anxiety can significantly disrupt daily activities and often leads to emotional, behavioral, and physical distress. It is more common in children but can affect adults as well, especially concerning children or romantic partners.",
    "stages": {
        "Low": {
        "Emotional":"Individuals feel mild unease and some fear when separated, but it is manageable and doesn't interfere much with daily life.",
        "Behavioral":"There may be occasional reluctance to be apart, but it doesn't significantly affect participation in activities like school or work.",
        "Cognitive":"Worry about the safety of loved ones is present, but it is fleeting and doesn't cause much distress or disruption.",
        "Physical":"Mild stomach aches or headaches and slight tension are common, but they are manageable and don't impact functioning.",
        },
        "Mild": {
        "Emotional":"Distress becomes more frequent, with anxiety triggered by reminders of separation, such as goodbye rituals or seeing clocks.",
        "Behavioral":"Individuals may begin avoiding activities like school or social outings and plan their day around being near loved ones.",
        "Cognitive":"There is frequent reassurance-seeking and a tendency to misinterpret normal delays or lack of contact as emergencies.",
        "Physical":"Physical symptoms like stomach discomfort, headaches, sweaty palms, and light sleep disturbances become more common.",
        },
        "Moderate": {
        "Emotional":"Constant worry and fear of something bad happening, such as harm to loved ones, often dominate thoughts and emotions.",
        "Behavioral":"There may be refusal to go places without loved ones and difficulty concentrating on or completing tasks.",
        "Cognitive":"Thoughts are focused on worst-case scenarios, excessive checking, and tracking of loved ones' whereabouts.",
        "Physical":"Headaches, nausea, muscle tension, dizziness, and difficulty sleeping alone are frequent physical symptoms.",
        },
        "Severe": {
        "Emotional":"Intense fear of harm or death to loved ones, often accompanied by overwhelming feelings of distress or panic.",
        "Behavioral":"Refusal to leave home or be without family, partner, or friends, with a reliance on them to make any decisions or participate in activities.",
        "Cognitive":"Intrusive thoughts about potential harm, extreme catastrophizing, and paranoia about betrayal or harm during separation.",
        "Physical":"Severe physical symptoms like chronic nausea, dizziness, rapid heart rate, excessive sweating, and frequent headaches.",
        },
    },
    "mainSymptoms": [
        "Intense emotional distress during separation, ranging from mild unease to overwhelming fear.",
        "Avoidance behaviors, such as refusing to attend school, social events, or other activities involving separation.",
        "Excessive worry about the safety of loved ones or oneself during separation, often leading to physical symptoms like headaches or stomachaches.",
        "Clinginess and seeking constant reassurance from loved ones, especially in more severe cases, which impacts daily life and routines.",
        "Physical symptoms like muscle tension, difficulty sleeping, and gastrointestinal issues, which worsen with increased anxiety.",
        "Significant impairment in daily functioning due to the anxiety and distress caused by separation, interfering with work, school, and social interactions.",
    ],
  },
  {
    "id": "SOCAD",
    "name": "Social Anxiety Disorder",
    "definition":"Social Anxiety Disorder (SAD) is a mental health condition marked by an intense fear of social or performance situations where one may be judged or humiliated. This fear leads to physical and cognitive symptoms such as sweating, trembling, and an intense urge to escape. SAD can deeply impact relationships, work, and social activities if left untreated.",
    "stages": {
        "Low": {
        "Emotional":"There is mild nervousness in social situations with occasional fear of being judged, but it is manageable.",
        "Behavioral":"Social interactions are rarely avoided, but there may be slight unease in unfamiliar situations.",
        "Cognitive":"Individuals may worry about how they are perceived by others, overthinking small social cues.",
        "Physical":"Minor physical symptoms such as slight sweating or a small tremor may occur when feeling self-conscious.",
        },
        "Mild": {
        "Emotional":"Fear of judgment or humiliation in social situations becomes more noticeable, and anxiety increases.",
        "Behavioral":"Social situations like public speaking or unfamiliar gatherings may be avoided, though individuals still participate in some social activities.",
        "Cognitive":"Individuals worry about upcoming events, overanalyze past interactions, and fear being judged negatively.",
        "Physical":"Sweating, racing heart, mild trembling, and blushing are common in social situations.",
        },
        "Moderate": {
        "Emotional":"Fear of embarrassment is intense, and there is constant dread of being judged in social situations.",
        "Behavioral":"There is avoidance of speaking in groups, initiating conversations, and skipping work or school events.",
        "Cognitive":"Obsessive thoughts about social mistakes and the belief that others are judging them negatively take up mental space.",
        "Physical":"Strong sweating, racing heart, shaking hands, and nausea are common in social settings.",
        },
        "Severe": {
        "Emotional":"Feelings of overwhelming fear and shame make social interactions unbearable. A sense of hopelessness may arise.",
        "Behavioral":"Social contact is avoided entirely, and the individual may be unable to attend school, work, or leave home.",
        "Cognitive":"Constant thoughts of failure and humiliation, along with a distorted self-image, dominate their thinking.",
        "Physical":"Panic symptoms such as shortness of breath, trembling, dizziness, and feeling like blacking out occur in social situations.",
        },
    },
    "mainSymptoms": [
        "Persistent fear of being judged negatively or humiliated in social settings.",
        "Physical symptoms like sweating, trembling, rapid heartbeat, and blushing when in social situations.",
        "Avoidance of social interactions, public speaking, or situations where one might feel anxious or scrutinized.",
        "Excessive worry both before and after social events, constantly fearing embarrassment or negative evaluation.",
        "Difficulty interacting in groups, making eye contact, speaking, or initiating conversations due to fear of judgment.",
        "Low self-esteem and feelings of inadequacy, often believing that one is not good enough in social contexts.",
    ],
  }
]

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text_input = data.get("text", "")

    if not text_input.strip():
        return jsonify({"error": "Empty input"}), 400

    inputs = tokenizer(text_input, return_tensors="pt", truncation=True, padding='max_length', max_length=256)
    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        # Predict anxiety type
        type_outputs = type_model(**inputs)
        type_probs = F.softmax(type_outputs.logits, dim=-1)
        predicted_type_idx = torch.argmax(type_probs).item()
        predicted_type = type_labels[predicted_type_idx]

        # Predict severity level
        severity_outputs = severity_model(**inputs)
        severity_probs = F.softmax(severity_outputs.logits, dim=-1)
        predicted_severity_idx = torch.argmax(severity_probs).item()
        predicted_severity = severity_levels[predicted_severity_idx]

        # Map to confidence percentage within severity range
        prob_value = severity_probs[0, predicted_severity_idx].item()
        min_perc, max_perc = severity_percent_ranges[predicted_severity_idx]
        confidence = round(min_perc + (max_perc - min_perc) * prob_value, 2)

    return jsonify({
        "predicted_type": predicted_type,
        "predicted_level": predicted_severity,
        "confidence": f"{confidence}%"  # Optional: keep as string
    })

@app.route("/condition-info", methods=["GET"])
def get_condition_info():
    return jsonify(conditionInfo)

if __name__ == "__main__":
    app.run(debug=True, port=5001)