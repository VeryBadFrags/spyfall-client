import { FaPlay } from "react-icons/fa";
import {
  FaGamepad,
  FaMapMarkerAlt,
  FaQuestion,
  FaStopwatch,
  FaUsers,
  FaUserSecret,
} from "react-icons/fa";

interface HeroProps {
  onPlayNowClick: () => void;
}

export default function Hero(props: HeroProps) {
  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card shadow-sm">
          <div className="card-header">
            <h1 className="text-center">Play Spyfall Online</h1>
          </div>
          <div className="card-body text-center">
            <p className="lead mb-4">
              A multiplayer social deduction game. Can you find the spy before
              time runs out?
            </p>

            <button
              className="btn btn-primary btn-lg px-5 py-3 mb-4"
              onClick={props.onPlayNowClick}
            >
              <FaPlay /> Play Now
            </button>

            <div className="row g-3 text-start justify-content-center mx-auto" style={{ maxWidth: "900px" }}>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5>
                      <FaUserSecret className="text-primary me-2" />
                      One Spy
                    </h5>
                    <p className="text-muted mb-0">
                      One player is secretly the spy and must blend in
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5>
                      <FaMapMarkerAlt className="text-primary me-2" />
                      Secret Location
                    </h5>
                    <p className="text-muted mb-0">
                      Everyone knows the location except the spy
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5>
                      <FaQuestion className="text-primary me-2" />
                      Ask Questions
                    </h5>
                    <p className="text-muted mb-0">
                      Players ask each other questions to find the spy
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5>
                      <FaUsers className="text-primary me-2" />
                      3-10 Players
                    </h5>
                    <p className="text-muted mb-0">
                      Perfect for game nights with friends
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5>
                      <FaStopwatch className="text-primary me-2" />
                      Quick Rounds
                    </h5>
                    <p className="text-muted mb-0">
                      5-minute rounds keep the action fast
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5>
                      <FaGamepad className="text-primary me-2" />
                      Free to Play
                    </h5>
                    <p className="text-muted mb-0">
                      No downloads or sign-ups required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
