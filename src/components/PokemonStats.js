import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
const PokemonStats = ({ stats }) => {
  const now = 60;
  console.log(stats);
  return (
    <>
      <div className="container Pokemon-stats">
        <div>
          <h3>Stats</h3>
        </div>
        <section className="progressbar-col">
          <div>
            <p>HP</p>
            <ProgressBar
              now={stats[0]?.base_stat}
              label={`${now}%`}
              visuallyHidden
            />
          </div>
          <div>
            <p>Attack</p>
            <ProgressBar
              now={stats[1]?.base_stat}
              label={`${now}%`}
              visuallyHidden
            />
          </div>
          <div>
            <p>Defense</p>
            <ProgressBar now={stats[2]?.base_stat} visuallyHidden />
          </div>
          <div>
            <p>Speed</p>
            <ProgressBar now={stats[5]?.base_stat} visuallyHidden />
          </div>
          <div>
            <p>Sp. Attack</p>
            <ProgressBar now={stats[3]?.base_stat} visuallyHidden />
          </div>
          <div>
            <p>Sp. Def.</p>
            <ProgressBar now={stats[4]?.base_stat} visuallyHidden />
          </div>
        </section>
      </div>
    </>
  );
};

export default PokemonStats;
