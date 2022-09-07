import { UserContext } from "../lib/context";
import { useContext } from "react";
import Link from "next/link";

export default function AuthCheck(props) {
  const { user } = useContext(UserContext);
  return user ? props.children : <Back />
}
function Back() {
  return <Link href="/admin">Go back</Link>
}