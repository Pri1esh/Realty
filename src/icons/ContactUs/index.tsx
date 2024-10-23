import React, { FC } from 'react';

interface Iprops {
  className?: string;
}
const ContactUs: FC<Iprops> = ({ className }) => {
  return (
    <svg viewBox="0 0 20 20" className={className}>
      <path
        d="M17.5721172,11.0318476 C17.3506815,11.0318476 17.1191805,10.9613908 16.8977448,10.9110645 C16.4493206,10.8122487 16.0086495,10.6810565 15.5791958,10.5185194 C14.6121763,10.1667197 13.5355192,10.6008556 13.0830116,11.5250453 L12.8615759,11.9779819 C11.881222,11.4326242 10.9803618,10.7552858 10.1842169,9.9649301 C9.39386125,9.1687852 8.71652279,8.26792505 8.17116508,7.28757115 L8.59390597,7.0057439 C9.51809566,6.55323623 9.95223159,5.47657914 9.60043189,4.50955962 C9.44061767,4.07919142 9.30948232,3.63871114 9.20788678,3.19101066 C9.15756048,2.96957496 9.11729945,2.738074 9.08710367,2.50657304 C8.83458429,1.04184882 7.55370092,-0.0212843719 6.06752591,0.000323497143 L3.04794815,0.000323497143 C2.17019557,-0.00791807671 1.33230203,0.366204174 0.752495771,1.02525063 C0.172689508,1.68429708 -0.0916331035,2.56302718 0.0283703955,3.43257688 C1.13145427,12.1070802 7.97771907,18.9284796 16.6561786,20 L17.0386584,20 C17.7808858,20.0010824 18.497514,19.7287637 19.0517103,19.2350338 C19.6958192,18.658942 20.062241,17.8344929 20.0582687,16.9703505 L20.0582687,13.9507727 C20.0328107,12.5089853 18.9914872,11.2863788 17.5721172,11.0318476 Z M18.0753801,17.0710031 C18.075014,17.3601047 17.9503538,17.6350906 17.7331613,17.8258975 C17.5063734,18.0233779 17.2061975,18.114895 16.9078101,18.077529 C9.15356444,17.0832836 3.05923594,10.9599542 2.10181379,3.20107592 C2.06944245,2.903138 2.16036073,2.60492604 2.35344527,2.37572467 C2.54425223,2.15853222 2.81923813,2.03387194 3.10833971,2.03350585 L6.12791747,2.03350585 C6.61074071,2.02276255 7.03314492,2.35646188 7.13444339,2.82866133 C7.17470442,3.10377841 7.22503072,3.37554041 7.28542227,3.64394732 C7.40169562,4.17453152 7.55643851,4.69594778 7.7484242,5.2040625 L6.33928791,5.85830435 C6.09594619,5.96995245 5.90711328,6.17394972 5.81455685,6.42517432 C5.72200041,6.67639892 5.7333482,6.95414698 5.84609021,7.19698382 C7.29468293,10.2998567 9.78889875,12.7940725 12.8917716,14.2426653 C13.1368218,14.343336 13.4116812,14.343336 13.6567313,14.2426653 C13.9102859,14.1519718 14.1169255,13.9634585 14.2304511,13.7192718 L14.8544972,12.3101355 C15.374837,12.4962191 15.9058999,12.6508323 16.4448081,12.7731374 C16.7132151,12.833529 16.984977,12.8838553 17.2600941,12.9241163 C17.7322936,13.0254148 18.0659929,13.447819 18.0552496,13.9306422 L18.0753801,17.0710031 Z"
        id="Shape"
      ></path>
    </svg>
  );
};
export { ContactUs };
