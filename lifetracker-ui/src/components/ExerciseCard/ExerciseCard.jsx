import "./ExerciseCard.css";

export default function ExerciseCard() {
  return (
    <div className="chakra-stack css-xixnl8">
      <span className="css-89mcmc">Today at 5:15 AM</span>
      <div className="css-1d1dt3r">
        <div className="css-56yjmq">
          <span className="chakra-avatar css-1q3drxz">
            <div
              role="img"
              aria-label="Running"
              className="chakra-avatar__initials css-1ebyn6"
            >
              R
            </div>
          </span>
          <div className="css-1kw2fa0">
            <h2 className="chakra-heading css-y5314g">
              Running<span className="chakra-badge css-lvvibp"></span>
            </h2>
          </div>
        </div>
        <div className="white css-1lekzkb">
          <div className="chakra-stat css-1mbo1ls">
            <dl>
              <dt className="chakra-stat__label css-14go5ty">Duration</dt>
              <dd className="chakra-stat__number css-1axeus7">12</dd>
            </dl>
          </div>
          <div className="chakra-stat css-1mbo1ls">
            <dl>
              <dt className="chakra-stat__label css-14go5ty">Intensity</dt>
              <dd className="chakra-stat__number css-1axeus7">10/10</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
