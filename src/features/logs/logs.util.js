import Logs from './logs.model';

const CreateLog = async (serviceType, userId, to, from, msgId) => Logs.create({ serviceType, userId, to, from, msgId });

export default CreateLog;
