/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable padded-blocks */

import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <div className="text-center">
          <h1 className="h4 text-muted">Страница не найдена</h1>
          <p className="text-muted">
            Но вы можете перейти
            <Link to="/">на главную страницу</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
export default NotFoundPage;
