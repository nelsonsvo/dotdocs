import { User } from "../entities/User";
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";
import { ApolloError } from "apollo-client";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return User.find();
  }
  @Query(() => User, { nullable: true })
  async login(@Arg("username") username: string, @Arg("password") password: string) {
    const user = await User.findOne({ username });
    if (user) {
      const valid = await argon2.verify(user.password, password);
      if (valid) {
        return user;
      }
    }
    throw new ApolloError({
      errorMessage: "Incorrect username or password",
    });
  }

  @Mutation(() => User)
  async createUser(@Arg("username") username: string, @Arg("user_type") user_type: string, @Arg("password") password: string) {
    try {
      const hash = await argon2.hash(password);
      const user = User.create({ username, user_type, password: hash });
      await User.save(user);

      return user;
    } catch {
      throw new ApolloError({
        errorMessage: "Failed to create user",
      });
    }
  }
}
