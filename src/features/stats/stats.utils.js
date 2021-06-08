import smsModal from "./sms.modal";

const getRoute = (req) => {
  const route = req.route ? req.route.path : ""; // check if the handler exist
  console.log(route);

  const baseUrl = req.baseUrl ? req.baseUrl : ""; // adding the base url if the handler is child of other handler
  return route ? `${baseUrl === "/" ? "" : baseUrl}${route}` : "unknown route";
};

const handle = async (id) => {
  await smsModal.findOneAndUpdate(
    { userId: id },
    { $inc: { ge: 0.5 } },
    { new: true },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

let visits = async function (req, res, next) {

  res.on("finish", () => {
    // const event = `${req.method} ${getRoute(req)} ${res.statusCode}`;
    if (res.statusCode === 200 && getRoute(req) === "/sms/") {
      req.body.userId = req.user._id;
      smsModal.findOne({ userId: req.user._id }, (err, result) => {
        if (result) {
          handle(result.userId);
        } else {
          smsModal.create(req.body, (err, result) => {
            if (err) {
              console.log(err);
            }
            handle(result.userId);
          });
        }
      });
    }
  });
  next();
};

export default visits;
