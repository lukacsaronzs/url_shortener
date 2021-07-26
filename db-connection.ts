import config from 'config';
import mongoose from 'mongoose';

export default () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.ObjectId = mongoose.Types.ObjectId;

    // db connection
    const uri: string = config.get('mongodbUri');
    void mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }).then();
};
