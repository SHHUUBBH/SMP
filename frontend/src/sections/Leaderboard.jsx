export default function Leaderboard() {
  return (
    <section className="section leaderboard" id="leaderboard">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Season III Standings</span>

          <h2>Hall of the Reaping</h2>

          <p>
            Updated hourly. These are the hearts still beating the loudest.
          </p>
        </div>

        <div className="board reveal">
          <div className="board-row board-head" aria-hidden="true">
            <span></span>
            <span>Player</span>
            <span>Hearts held</span>
            <span>Total</span>
          </div>

          <div className="board-row rank-1">
            <span className="rank-num">01</span>

            <div className="player">
              <div className="avatar c1">L</div>

              <div className="player-info">
                <b>Lorem_Ipsum</b>
                <span>47 kills · The Sovereign</span>
              </div>
            </div>

            <div className="pip-row">
              <span className="filled">♥♥♥♥♥♥♥♥♥♥</span>
            </div>

            <div className="hearts-count">20/20</div>
          </div>

          <div className="board-row">
            <span className="rank-num">02</span>

            <div className="player">
              <div className="avatar c2">D</div>

              <div className="player-info">
                <b>DolorSit</b>
                <span>39 kills</span>
              </div>
            </div>

            <div className="pip-row">
              <span className="filled">♥♥♥♥♥♥♥♥♥</span>
              <span className="hollow">♡</span>
            </div>

            <div className="hearts-count">18/20</div>
          </div>

          <div className="board-row">
            <span className="rank-num">03</span>

            <div className="player">
              <div className="avatar c3">A</div>

              <div className="player-info">
                <b>AmetConsec</b>
                <span>33 kills</span>
              </div>
            </div>

            <div className="pip-row">
              <span className="filled">♥♥♥♥♥♥♥♥</span>
              <span className="hollow">♡♡</span>
            </div>

            <div className="hearts-count">16/20</div>
          </div>

          <div className="board-row">
            <span className="rank-num">04</span>

            <div className="player">
              <div className="avatar c4">T</div>

              <div className="player-info">
                <b>tetur.adip</b>
                <span>28 kills</span>
              </div>
            </div>

            <div className="pip-row">
              <span className="filled">♥♥♥♥♥♥♥</span>
              <span className="hollow">♡♡♡</span>
            </div>

            <div className="hearts-count">14/20</div>
          </div>

          <div className="board-row">
            <span className="rank-num">05</span>

            <div className="player">
              <div className="avatar c5">E</div>

              <div className="player-info">
                <b>elitSed_</b>
                <span>24 kills</span>
              </div>
            </div>

            <div className="pip-row">
              <span className="filled">♥♥♥♥♥♥</span>
              <span className="hollow">♡♡♡♡</span>
            </div>

            <div className="hearts-count">12/20</div>
          </div>

          <div className="board-row">
            <span className="rank-num">06</span>

            <div className="player">
              <div className="avatar c6">D</div>

              <div className="player-info">
                <b>DoEiusmod</b>
                <span>19 kills</span>
              </div>
            </div>

            <div className="pip-row">
              <span className="filled">♥♥♥♥♥</span>
              <span className="hollow">♡♡♡♡♡</span>
            </div>

            <div className="hearts-count">10/20</div>
          </div>
        </div>
      </div>
    </section>
  );
}