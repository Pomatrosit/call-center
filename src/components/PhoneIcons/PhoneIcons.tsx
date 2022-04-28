import { FC } from "react";
import { useDispatch } from "react-redux";
import classes from "./PhoneIcons.module.scss";
import ReactTooltip from "react-tooltip";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  setCurrentPhone,
  setHold,
  setMuted,
  setOnCall,
  setSession,
} from "../../store/webphone/actions";
import { getCallOptions } from "../../helpers/webPhone";
import MicrophoneIcon from "../Icons/MicrophoneIcon";
import DisabledMicrophoneIcon from "../Icons/DisabledMicrophoneIcon";
import PauseIcon from "../Icons/PauseIcon";
import UnpauseIcon from "../Icons/UnpauseIcon";
import { FormikProps } from "formik";
import { IWebPhoneValues } from "../WebPhone/WebPhone";

interface IProps {
  formik: FormikProps<IWebPhoneValues>;
  minified?: boolean;
}

const PhoneIcons: FC<IProps> = ({ formik, minified = false }) => {
  const dispatch = useDispatch();
  const {
    coolPhone,
    isOnCall,
    session,
    isMute,
    isHold,
    isConfirmed,
    isIncomingRing,
  } = useAppSelector((state) => state.webPhone);

  const phoneClickHandler = () => {
    if (!isOnCall) {
      if (!formik.errors.phone && formik.touched.phone) {
        const phone = formik.values.phone;
        const session = coolPhone.call(phone, getCallOptions());
        dispatch(setSession(session));
        if (phone) dispatch(setCurrentPhone(phone));
      } else {
        formik.setFieldTouched("phone", true);
      }
    } else {
      if (session) session.terminate();
      dispatch(setOnCall(false));
    }
  };

  const answerOnIncomingCall = () => {
    session.answer(getCallOptions());
    session.connection.addEventListener("addstream", function (e: any) {
      console.log(e);
      const remoteAudio: HTMLAudioElement | null =
        document.querySelector(".audio");
      if (remoteAudio) {
        remoteAudio.srcObject = e.stream;
        remoteAudio.play();
      }
    });
  };

  const toggleMute = () => {
    if (session) {
      if (!isMute) {
        session.mute({ audio: true, video: false });
        dispatch(setMuted(true));
      } else {
        session.unmute({ audio: true, video: false });
        dispatch(setMuted(false));
      }
    }
  };

  const toggleHold = () => {
    if (session) {
      if (!isHold) {
        session.hold();
        dispatch(setHold(true));
      } else {
        session.unhold();
        dispatch(setHold(false));
      }
    }
  };

  const microphoneIconClasses = [classes.microphoneIcon];
  const holdIconClasses = [classes.holdIcon];
  if (!isConfirmed) {
    microphoneIconClasses.push(classes.onNotOnCall);
    holdIconClasses.push(classes.onNotOnCall);
  }
  if (isMute) {
    microphoneIconClasses.push(classes.pressed);
  }
  if (isHold) {
    holdIconClasses.push(classes.pressed);
  }

  return (
    <div
      className={
        classes.phoneIcons + ` ${minified ? classes.minifiedIcons : ""}`
      }
    >
      {isIncomingRing ? (
        <div
          data-tip={"Поднять трубку"}
          className={classes.phoneIcon + " " + classes.ringingIcon}
          onClick={answerOnIncomingCall}
        >
          <div className={classes.ring}></div>
          <img src="/icons/greenPhone.svg" alt="phone" />
        </div>
      ) : (
        <div
          data-tip={!isOnCall ? "Начать звонок" : "Завершить звонок"}
          className={
            classes.phoneIcon + ` ${!isOnCall ? classes.isNotOnCall : ""}`
          }
          onClick={phoneClickHandler}
        >
          <img
            src={!isOnCall ? "/icons/greenPhone.svg" : "/icons/redPhone.svg"}
            alt="phone"
          />
        </div>
      )}

      <div
        data-tip={!isMute ? "Выключить микрофон" : "Включить микрофон"}
        className={microphoneIconClasses.join(" ")}
        onClick={toggleMute}
      >
        {!isMute ? <MicrophoneIcon /> : <DisabledMicrophoneIcon />}
      </div>

      <div
        data-tip={
          !isHold ? "Поставить звонок на удержание" : "Снять звонок с удержания"
        }
        className={holdIconClasses.join(" ")}
        onClick={toggleHold}
      >
        {!isHold ? <PauseIcon /> : <UnpauseIcon />}
      </div>

      <ReactTooltip delayShow={500} globalEventOff={"click"} />
    </div>
  );
};

export default PhoneIcons;
