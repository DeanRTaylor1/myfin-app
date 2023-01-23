import mongoose from 'mongoose';
import { Password } from '../../services/password';

//An interface that describes the properties
//that are required to make a new user
interface UserAttrs {
  username: string;
  email: string;
  password: string;
  confirmed?: boolean;
}

//an interface that describes the properties that a model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  confirmed: boolean;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.confirmed;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

//If the password has been updated then ensure we rehash it when storing
userSchema.pre('save', async function (done) {
  //middleware mongoose function must be wrritten like this to maintain this reference
  if (this.isModified('password')) {
    //only do this if the password has been changed
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  //add function as static method on the userSchema
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
