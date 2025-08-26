import { useNavigate } from "react-router-dom";
import "./Resources.css";

const resources = [
  { title: "ICD-10 GAD Diagnostic Code", url: "https://www.icd10data.com/ICD10CM/Codes/F01-F99/F40-F48/F41-/F41.1" },
  { title: "DSM-5 Anxiety Disorders (Table 15)", url: "https://www.ncbi.nlm.nih.gov/books/NBK519704/table/ch3.t15/" },
  { title: "DSM-5 Generalized Anxiety Disorder (PDF)", url: "https://cmhrc.org/wp-content/uploads/2022/09/DSM-5-Generalized-Anxiety-Disorder.pdf" },
  { title: "DSM-5 OCD (PDF)", url: "https://cmhrc.org/wp-content/uploads/2022/09/DSM-5-OCD.pdf" },
  { title: "OCD Overview - NCBI", url: "https://www.ncbi.nlm.nih.gov/books/NBK56452/" },
  { title: "Beyond OCD – Clinical Definition", url: "https://beyondocd.org/information-for-individuals/clinical-definition-of-ocd" },
  { title: "PsychCentral - DSM-5 OCD Changes", url: "https://psychcentral.com/ocd/dsm-5-changes-obsessive-compulsive-and-related-disorders#what-are-the-changes" },
  { title: "MantraCare - OCD Diagnosis", url: "https://mantracare.org/ocd/ocd-diagnosis/dsm-5-ocd/" },
  { title: "DSM-5 Panic Disorder Criteria (Table 10)", url: "https://www.ncbi.nlm.nih.gov/books/NBK519704/table/ch3.t10/" },
  { title: "Diagnosing Panic Disorder", url: "https://www.verywellmind.com/diagnosing-panic-disorder-2583930" },
  { title: "DSM-5 Panic Disorder Criteria (PDF)", url: "https://www.carepatron.com/files/dsm-5-criteria-for-panic-disorder.pdf" },
  { title: "Counseling.org - Panic Disorder (PDF)", url: "https://www.counseling.org/docs/default-source/practice-briefs/panic-disorder.pdf?sfvrsn=8a1624bb_1" },
  { title: "How to Recognize PTSD", url: "https://vailhealthfoundation.org/news/how-to-recognize-ptsd-in-a-loved-one-family-member-or-friend/" },
  { title: "PTSD Diagnostic Box - NCBI", url: "https://www.ncbi.nlm.nih.gov/books/NBK207191/box/part1_ch3.box16/" },
  { title: "PTSD Diagnosis (Table 1)", url: "https://www.ncbi.nlm.nih.gov/books/NBK525126/table/ch2.tab1/" },
  { title: "DSM-5 PTSD Criteria - MDCalc", url: "https://www.mdcalc.com/calc/10211/dsm-5-criteria-posttraumatic-stress-disorder" },
  { title: "VA Disability Group - PTSD Criteria", url: "https://vadisabilitygroup.com/dsm-5-criteria-for-post-traumatic-stress-disorder-ptsd/" },
  { title: "PTSD Diagnostic Table 11", url: "https://www.ncbi.nlm.nih.gov/books/NBK519712/table/ch3.t11/" },
  { title: "Separation Anxiety Overview", url: "https://my.clevelandclinic.org/health/diseases/separation-anxiety-disorder" },
  { title: "Separation Anxiety Criteria (PDF)", url: "https://www.carepatron.com/files/separation-anxiety-disorder-dsm-5-criteria.pdf" },
  { title: "Social Anxiety DSM-5 (Theravive)", url: "https://www.theravive.com/therapedia/social-anxiety-disorder-(social-phobia)-dsm--5-300.23-(f40.10)" },
  { title: "Social Anxiety Institute - DSM", url: "https://socialanxietyinstitute.org/dsm-definition-social-anxiety-disorder" },
  { title: "DSM-5 Social Anxiety (Table 12)", url: "https://www.ncbi.nlm.nih.gov/books/NBK519712/table/ch3.t12/" },
  { title: "Mayo Clinic - Social Anxiety Diagnosis", url: "https://www.mayoclinic.org/diseases-conditions/social-anxiety-disorder/diagnosis-treatment/drc-20353567" },
  { title: "Social Anxiety DSM-5 PDF", url: "https://www.carepatron.com/files/dsm-5-criteria-for-social-anxiety-disorder.pdf" },
  { title: "16 Personalities Test", url: "https://www.16personalities.com/free-personality-test" },
  { title: "Big Five Personality Test", url: "https://bigfive-test.com/#google_vignette" },
  { title: "ADHD Screening Tool", url: "https://screening.mhanational.org/screening-tools/adhd/" },
];

const ResourcesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="resources-page">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h1 className="resources-title">Mental Health Resources</h1>

      {/* Description text */}
      <p className="resources-description">
        A curated list of trusted articles, guidelines, and diagnostic criteria related to various mental health conditions, including anxiety disorders, OCD, PTSD, and more. Click on any resource to learn in depth.
      </p>

      <div className="resources-grid">
        {resources.map((res, index) => (
          <div className="resource-card" key={index}>
            <a
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              {res.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
