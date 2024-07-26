import { useContext } from "react";
import { LoginContext } from "../providers/LoginProvider";

const useLoginConfig = () => useContext(LoginContext);
export default useLoginConfig;
