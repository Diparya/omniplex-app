import React, { useState } from "react";
import styles from "./Auth.module.css";
import Image from "next/image";
import { Modal, ModalContent } from "@nextui-org/modal";
import Spinner from "../Spinner/Spinner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Auth = ({ isOpen, onClose }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Signed in successfully!"); // Placeholder for actual authentication logic
      onClose();
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      radius="md"
      backdrop="blur"
      placement="center"
      closeButton={<div />}
    >
      <ModalContent>
        {() => (
          <div className={styles.modal}>

            {/* Body */}
            <div className={styles.body}>
              <h1 className={styles.heading}>Your ideas, amplified</h1>
              <p className={styles.subheading}>
                Privacy-first AI that helps you create in confidence.
              </p>

              {/* Authentication Options */}
              <div className={styles.authOptions}>
                {loading ? (
                  <div className={styles.spinnerContainer}>
                    <Spinner />
                    <p>Signing you in...</p>
                  </div>
                ) : (
                  <>
                    <button
                      className={styles.googleButton}
                      onClick={handleGoogleAuth}
                    >
                      <Image
                        src="/svgs/Google.svg"
                        alt="Google Icon"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Continue with Google
                    </button>
                    <div className={styles.orDivider}>OR</div>
                    <input
                      type="email"
                      placeholder="Enter your personal or work email"
                      className={styles.emailInput}
                    />
                    <button className={styles.emailButton}>
                      Continue with email
                    </button>
                  </>
                )}
              </div>

              {/* Terms */}
              <p className={styles.terms}>
                By continuing, you agree to Anthropic's{" "}
                <a href="#" className={styles.link}>
                  Terms and Privacy Policy
                </a>
                .
              </p>
            </div>

            
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Auth;
