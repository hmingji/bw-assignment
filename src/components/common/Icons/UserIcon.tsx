const sizes = {
  lg: 'w-14 h-14',
  md: 'w-7 h-7',
};

export function UserIcon({ size }: { size: keyof typeof sizes }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      className={sizes[size]}
    >
      <defs>
        <filter
          id="Ellipse_1"
          x="0"
          y="0"
          width="64"
          height="64"
          filterUnits="userSpaceOnUse"
        >
          <feOffset
            dy="3"
            in="SourceAlpha"
          />
          <feGaussianBlur
            stdDeviation="1.5"
            result="blur"
          />
          <feFlood
            floodColor="#575757"
            floodOpacity="0.161"
          />
          <feComposite
            operator="in"
            in2="blur"
          />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g
        id="user-icon"
        transform="translate(-114.5 -35.52)"
      >
        <g
          transform="matrix(1, 0, 0, 1, 114.5, 35.52)"
          filter="url(#Ellipse_1)"
        >
          <circle
            id="Ellipse_1-2"
            data-name="Ellipse 1"
            cx="27.5"
            cy="27.5"
            r="27.5"
            transform="translate(4.5 1.5)"
            fill="#f2f2f2"
          />
        </g>
        <path
          id="Path_28"
          data-name="Path 28"
          d="M3.238,35.071c2.7-4.506,8.622-7.589,17.858-7.589s15.157,3.084,17.858,7.589M28.433,11.837A7.337,7.337,0,1,1,21.1,4.5,7.337,7.337,0,0,1,28.433,11.837Z"
          transform="translate(125.418 42.682)"
          fill="none"
          stroke="#505050"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
