import React from "react";
import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Card = ({
  name,
  facebook,
  instagram,
  twitter,
  description,
  backgroundImage,
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className={styles.maindiv}
    >
      <div className={styles.innerMain}>
        <div className={styles.name}>
          <div className={styles.name1}>{name}</div>
          <div className={styles.mainDivIconAndDes}>
            <div className={styles.mainicon}>
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.icon}
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.icon}
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.icon}
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
            <div className={styles.description}>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
