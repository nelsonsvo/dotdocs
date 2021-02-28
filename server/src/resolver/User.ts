import { User } from "./../entity/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";
@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return User.find();
  }
  @Mutation(() => User)
  async login(@Arg("username") username: string, @Arg("password") password: string) {
    const user = await User.findOne({ username });
    if (user) {
      const passwordMatches = await argon2.verify(user.password, password);
      if (passwordMatches) {
        return user;
      }
    }
    return {
      username: "incorrect_user",
      password: "incorrect_password",
    };
  }

  @Mutation(() => User)
  async createUser(@Arg("username") username: string, @Arg("password") password: string) {
    const hash = await argon2.hash(password);
    const user = User.create({ username, password: hash });
    await User.save(user);

    return user;
  }
}
