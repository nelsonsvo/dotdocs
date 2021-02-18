import { User } from "./../entity/User";
import { Arg, Mutation, ObjectType, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return User.find();
  }
  @Query(() => String)
  hello() {
    return "hello world";
  }

  @Mutation(() => User)
  async createUser(@Arg("username") username: string, @Arg("password") password: string) {
    const user = User.create({ username, password });
    await User.save(user);

    return user;
  }
}
