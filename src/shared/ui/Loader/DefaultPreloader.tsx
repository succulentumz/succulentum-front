import { FC } from 'react';

export const DefaultPreloader: FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
        <stop stopColor="currentColor" stopOpacity="0" offset="0%" />
        <stop stopColor="currentColor" stopOpacity=".631" offset="63.146%" />
        <stop stopColor="currentColor" offset="100%" />
      </linearGradient>
    </defs>
    <g transform="translate(2,2)" fill="none">
      <path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#a)" strokeWidth="3">
        <animateTransform
          xmlns="http://www.w3.org/2000/svg"
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 18 18"
          to="360 18 18"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
          fill="freeze"
        />
      </path>
    </g>
  </svg>
);
