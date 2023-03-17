import { SVGProps } from 'react';

const ExitIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        d='m10.5 17l-1.4-1.45L11.65 13H3v-2h8.65L9.1 8.45L10.5 7l5 5ZM3 21v-6h2v4h14V5H5v4H3V3h18v18Z'
      ></path>
    </svg>
  );
};

export default ExitIcon;
