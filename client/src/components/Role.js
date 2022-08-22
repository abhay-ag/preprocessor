import React from "react";
import { useStateValue } from "../StateProvider";

function Role() {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  const [role, setRole] = React.useState("");
  return (
    <div>
      <form>
        <div>
          <font>Select Role</font>
          <select value={role} onChange = {(e) => setRole(e.target.value)}>
            <option value="Farmer">Farmer</option>
            <option value="State">State Dealer</option>
            <option value="District">District Dealer</option>
            <option value="Dealer">Dealer</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Role;
