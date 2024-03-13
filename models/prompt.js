
import {model, Schema, models} from "mongoose";

const promptSchema = new Schema( {
    //TODO: creator property is not creating while checking in deb. Fix the bug
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',    
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.']
    }
})

const Prompt = models.Prompt || model('Prompt',promptSchema)

export default Prompt