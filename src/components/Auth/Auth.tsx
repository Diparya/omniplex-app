import React, { useState } from "react";
import styles from "./Auth.module.css";
import Image from "next/image";
import { Modal, ModalContent } from "@nextui-org/modal";
import Spinner from "../Spinner/Spinner";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../firebaseConfig";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Auth = ({ isOpen, onClose }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google User Info:", user);
      alert(`Signed in as ${user.displayName}`);
      onClose();
    } catch (error: any) {
      console.error("Google Auth Error:", error);
      alert("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
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
                By continuing, you agree to Anthropics{" "}
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
