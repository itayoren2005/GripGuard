import { FC } from "react";
import "./general.css";

import { BLOCK_EXPLANATION } from "../../shared/Constants";

const Block: FC = () => {
  return (
    <div className="block-paper">
      <img className="block-logo" src="/gripGuard.png" />
      <h2 className="block-title">PAGE BLOCKED</h2>
      <h4 className="block-body">{BLOCK_EXPLANATION}</h4>
    </div>
  );
};

export default Block;
