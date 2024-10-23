import { CustomImage, SectionHeader } from '@components';
import { IEmiCalculator } from '@interfaces';
import { useEffect, useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import SemicircularProgressBar from './SemicircularProgressBar';
import styles from './emiCalculator.module.scss';

const EmiCalculator = (props: IEmiCalculator) => {
  const { emiCalculatorData } = props;
  const [loanAmount, setloanAmount] = useState<number>(parseInt(emiCalculatorData?.defaultLoanAmount) / 100000);
  const [interestRate, setinterestRate] = useState<number>(parseFloat(emiCalculatorData?.defaultInterestRate));
  const [loanTenure, setloanTenure] = useState<number>(parseInt(emiCalculatorData?.defaultLoanTenure));
  const [totalPayableAmount, settotalPayableAmount] = useState<number>(0);
  const [interestAmount, setinterestAmount] = useState<number>(0);
  const [monthlyAmount, setmonthlyAmount] = useState<number>(0);
  const [windowSize, setwindowSize] = useState<number>(100);
  const [resizing, setResizing] = useState<boolean>(false);

  const debounce_fun = () => {
    if (!resizing) {
      setResizing(true);
      setTimeout(() => {
        setwindowSize(window.innerWidth - 100);
        setResizing(false);
      }, 100);
    }
  };

  global.window && global.window.addEventListener('resize', debounce_fun);

  useEffect(() => {
    const screenSize = window.innerWidth;
    setwindowSize(screenSize - 100);

    const principal = loanAmount * 100000;
    const interest = interestRate / 1200;
    const tenure = loanTenure * 12;
    const top = Math.pow(1 + interest, tenure);
    const bottom = top - 1;
    const ratio = top / bottom;
    const EMI: number = principal * ratio * interest;

    setmonthlyAmount(Math.round(EMI));
    settotalPayableAmount(Math.round(EMI * tenure));
    setinterestAmount(Math.round(EMI * tenure - principal));
  }, [loanAmount, interestRate, loanTenure]);

  const convertToProperUnit = (amount: number) => {
    switch (true) {
      case amount < 100 && amount === 1:
        return `${amount} Lac`;
      case amount < 100:
        return `${amount} Lacs`;
      case amount >= 100:
        return `${amount / 100} Cr`;
      default:
        return '';
    }
  };

  return (
    <div className="section-row">
      <div className={styles.emicalculator}>
        <SectionHeader heading={emiCalculatorData?.heading} h1={false} />
        <Row>
          <div className="order-xl-1 order-2 col-xl-6">
            <div className={styles.containergapping}>
              <div className={styles.mxRange}>
                <span itemProp="text" className={styles.value}>
                  {emiCalculatorData?.rs}
                  {convertToProperUnit(loanAmount)}
                </span>
                <label itemProp="text" htmlFor="loanAmont" className={styles.rangeTitle}>
                  {emiCalculatorData?.loanAmountLabel}
                </label>
                <Form.Range
                  step={1}
                  min={parseInt(emiCalculatorData?.minLoanAmount) / 100000}
                  max={parseInt(emiCalculatorData?.maxLoanAmount) / 100000}
                  id="loanAmont"
                  value={loanAmount}
                  onChange={(e: any) => {
                    setloanAmount(e.target.value);
                  }}
                />
                <div className={styles.rangeLabels}>
                  <span itemProp="text">
                    {emiCalculatorData?.rs}
                    {emiCalculatorData?.minLoanAmountLabel}
                  </span>
                  <span itemProp="text">
                    {emiCalculatorData?.rs}
                    {emiCalculatorData?.maxLoanAmountLabel}
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <div className={styles.mxRange}>
                <span itemProp="text" className={styles.value}>
                  {interestRate}
                  {emiCalculatorData?.percent}
                </span>
                <label itemProp="text" htmlFor="interestRate" className={styles.rangeTitle}>
                  {emiCalculatorData?.interestRateLabel}
                </label>

                <Form.Range
                  step={0.05}
                  min={parseFloat(emiCalculatorData?.minInterestRate)}
                  max={parseFloat(emiCalculatorData?.maxInterestRate)}
                  id="interestRate"
                  value={interestRate}
                  onChange={(e: any) => {
                    setinterestRate(e.target.value);
                  }}
                />
                <div className={styles.rangeLabels}>
                  <span itemProp="text">{emiCalculatorData?.minInterestRateLabel}</span>
                  <span itemProp="text">{emiCalculatorData?.maxInterestRateLabel}</span>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <div className={styles.mxRange}>
                <span itemProp="text" className={styles.value}>
                  {loanTenure == 1
                    ? `${loanTenure + ' ' + emiCalculatorData?.years.replace('s', '')}`
                    : `${loanTenure + ' ' + emiCalculatorData?.years}`}
                </span>
                <label itemProp="text" htmlFor="loanTenure" className={styles.rangeTitle}>
                  {emiCalculatorData?.loanTenureLabel}
                </label>
                <Form.Range
                  step={1}
                  min={parseInt(emiCalculatorData?.minLoanTenure)}
                  max={parseInt(emiCalculatorData?.maxLoanTenure)}
                  value={loanTenure}
                  id="loanTenure"
                  onChange={(e: any) => {
                    setloanTenure(e.target.value);
                  }}
                />
                <div className={styles.rangeLabels}>
                  <span itemProp="text">{emiCalculatorData?.minLoanTenureLabel}</span>
                  <span itemProp="text">{emiCalculatorData?.maxLoanTenureLabel}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="order-xl-2 order-1 col-xl-6">
            <div className={styles.emivisual}>
              <SemicircularProgressBar
                monthlyAmount={monthlyAmount}
                diameter={Math.min(windowSize, 450)}
                percentage={(loanAmount * 100000 * 100) / totalPayableAmount}
              />
            </div>
            <Row className={styles.calculation}>
              <div className="col-4">
                <div className={styles.emiCalculations}>
                  <p itemProp="text" className="hideMobile">
                    {emiCalculatorData?.interestAmountLabel}
                  </p>
                  <p itemProp="text" className="hideDesktop">
                    {emiCalculatorData?.interestAmountMobileLabel}
                  </p>
                  <span itemProp="text" className={styles.voilet}>
                    {emiCalculatorData?.rs}
                    {interestAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              <div className="col-4">
                <div className={styles.emiCalculations}>
                  <p itemProp="text" className="hideMobile">
                    {emiCalculatorData?.principalAmountLabel}
                  </p>
                  <p itemProp="text" className="hideDesktop">
                    {emiCalculatorData?.principalAmountMobileLabel}
                  </p>
                  <span itemProp="text" className={styles.blue}>
                    {emiCalculatorData?.rs}
                    {(loanAmount * 100000).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              <div className="col-4">
                <div className={styles.emiCalculations}>
                  <p itemProp="text" className="hideMobile">
                    {emiCalculatorData?.totalPayableAmountLabel}
                  </p>
                  <p itemProp="text" className="hideDesktop">
                    {emiCalculatorData?.totalPayableAmountMobileLabel}
                  </p>
                  <span itemProp="text">
                    {emiCalculatorData?.rs}
                    {totalPayableAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </Row>
          </div>
        </Row>
        <div className={styles.bookingPartner}>
          <p itemProp="text">{emiCalculatorData?.ourBankingPartnersLabel}</p>
          <ul className="d-flex">
            {emiCalculatorData?.bankingPartnersData?.map(
              (bankingPartner: { src?: string; imgAlt?: string; imgTitle?: string }, key: number) => {
                return (
                  <li key={`${(bankingPartner?.src ?? '') + key}`}>
                    <CustomImage
                      itemProp="image"
                      src={bankingPartner?.src ? bankingPartner?.src : ''}
                      alt={bankingPartner?.imgAlt}
                      title={bankingPartner?.imgTitle}
                    />
                  </li>
                );
              },
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default EmiCalculator;
