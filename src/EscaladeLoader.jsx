import "./EscaladeLoader.css";


export default function EscaladeLoader() {
  return (
    <div className="escalade-loader-container">
      <svg viewBox="0 0 100 100">
        <g>
           <path d="M 50,100 A 1,1 0 0 1 50,0" />
         </g>
        <g>
           <path d="M 50,75 A 1,1 0 0 0 50,-25" />
         </g>
         <defs>
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(42, 123, 155, 1)" />
                    <stop offset="50%" stopColor="rgba(87, 199, 133, 1)" />
                    <stop offset="100%" stopColor="rgba(83, 237, 196, 1)" />
                </linearGradient>
            </defs>
        </defs>
      </svg>
      <p>Loading...</p>
    </div>
  );
}
