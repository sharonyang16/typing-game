import numWordsConstant from "@/static/numWords.json";
import capitalsConstant from "@/static/capitalsFilterOptions.json";
type FiltersProps = {
  selectedWordCount: number;
  selectedCapitals: string;
  handleWordCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCapitalsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Filters = ({
  selectedWordCount,
  selectedCapitals,
  handleWordCountChange,
  handleCapitalsChange,
}: FiltersProps) => {
  return (
    <div className="flex flex-col gap-4">
      <fieldset className="fieldset">
        <label className="label">Word Count</label>
        <div className="join join-vertical">
          {numWordsConstant.map((value) => (
            <input
              className="join-item btn"
              key={`numWords-${value}`}
              type="radio"
              name="word-count-options"
              value={value}
              checked={selectedWordCount === value}
              aria-label={value.toString()}
              onChange={handleWordCountChange}
            />
          ))}
        </div>
      </fieldset>
      <fieldset className="fieldset">
        <label className="label">Capitals</label>
        <div className="join join-vertical">
          {capitalsConstant.map(({ label, value }) => (
            <input
              className="join-item btn"
              key={`numWords-${value}`}
              type="radio"
              name="caps-options"
              value={value}
              checked={selectedCapitals === value}
              aria-label={label}
              onChange={handleCapitalsChange}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default Filters;
