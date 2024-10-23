import styles from './emiCalculator.module.scss';

const SemicircularProgressBar = ({
  monthlyAmount = 0,
  color = '#1d65c1',
  mainWidth = 12,
  backgroundColor = '#ad4277',
  diameter = 450,
  percentage = 0,
}) => {
  const centreCoordinateForSemicircularBar = diameter / 2;
  const radius = (diameter - 2 * mainWidth) / 2;
  const circumference = Math.PI * radius;

  let percentageValue;
  if (percentage > 100) {
    percentageValue = 100;
  } else if (percentage < 0) {
    percentageValue = 0;
  } else {
    percentageValue = percentage;
  }
  const semiCirclePercentage = percentageValue * (circumference / 100);

  return (
    <div className={styles.emiSemicircleContainer}>
      <svg height={diameter / 2} width={diameter}>
        <circle
          cx={centreCoordinateForSemicircularBar}
          cy={centreCoordinateForSemicircularBar}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={5}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
        <circle
          className="myProgress"
          cx={centreCoordinateForSemicircularBar}
          cy={centreCoordinateForSemicircularBar}
          r={radius}
          fill="none"
          strokeLinecap="round"
          stroke={color}
          strokeWidth={mainWidth}
          strokeDasharray={circumference}
          strokeDashoffset={semiCirclePercentage}
        />
      </svg>

      <span>
        <p>Your Monthly Home EMI</p>₹<strong>{monthlyAmount.toLocaleString('en-IN')}</strong>
      </span>
    </div>
  );
};

export default SemicircularProgressBar;
