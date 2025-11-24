import Link from "next/link";
import Banner from "../banner/banner";

type ResultsPageProps = {
  showSignUpBanner: boolean;
  showAccuracyWarningBanner: boolean;
  wpm: number;
  accuracy: number;
  secondsTaken: number;
  rawWpm: number;
  numWords: number;
};

type ResultsNumberLabelProps = {
  value: string | number;
  label: string;
};

const ResultsNumberLabel = ({ value, label }: ResultsNumberLabelProps) => {
  return (
    <div>
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-sm font-bold">{label}</p>
    </div>
  );
};

const ResultsPage = ({
  showSignUpBanner,
  showAccuracyWarningBanner,
  wpm,
  accuracy,
  secondsTaken,
  rawWpm,
  numWords,
}: ResultsPageProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Results</h1>
      {showSignUpBanner && (
        <Banner
          message="Sign up to save your results!"
          action={
            <div className="flex gap-2">
              <Link href="/authentication/login" className="btn btn-sm">
                Login
              </Link>
              <Link
                href="/authentication/sign-up"
                className="btn btn-sm btn-primary"
              >
                Sign up
              </Link>
            </div>
          }
        />
      )}
      {!showSignUpBanner && showAccuracyWarningBanner && (
        <Banner
          message="Your accuracy was too low to be saved."
          type="warning"
        />
      )}
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <ResultsNumberLabel value={wpm} label="WPM" />
          <ResultsNumberLabel value={`${accuracy}%`} label="Accuracy" />
          <ResultsNumberLabel value={secondsTaken} label="Seconds" />
        </div>
        <div className="flex flex-col gap-4">
          <ResultsNumberLabel value={rawWpm} label="Raw WPM" />
          <ResultsNumberLabel value={numWords} label="Words" />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
