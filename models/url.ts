import mongoose, { Document, Schema } from 'mongoose';


export interface Url extends Document {
    url: string;
    shortUrl: string;
    used: number;
}

const urlSchema = new Schema({
    url: { type: String, required: true, },
    shortUrl: { type: String, required: true, index: true },
    used: {type: Number, default: 0}
},{
    timestamps: true,
}
);

export default mongoose.model<Url>('url', urlSchema);
