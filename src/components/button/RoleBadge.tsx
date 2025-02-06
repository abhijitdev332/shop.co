import cl from "classnames";
const AdminBadge = ({ status = "", style = "", ...others }) => {
  return (
    <>
      {status.toLowerCase() == "user" ? (
        <span className={cl("badge rounded badge-primary", style)}>
          {status}
        </span>
      ) : (
        <>
          {status.toLowerCase() == "moderator" ? (
            <span className={cl("badge rounded badge-accent", style)}>
              {status}
            </span>
          ) : (
            <span className={cl("badge rounded badge-error", style)}>
              {status}
            </span>
          )}
        </>
      )}
    </>
  );
};

export default AdminBadge;
