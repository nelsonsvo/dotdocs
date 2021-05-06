import { ApolloError } from "apollo-client";
import { AuthenticationError } from "apollo-server-errors";
import * as argon2 from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Group } from "../entities/Group";
import { User } from "../entities/User";
import { MyContext } from "./../types/ContextType";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, res }: MyContext) {
    //not logged in

    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT LOGGED IN");
    }

    return await User.findOne({ id: req.session.userId });
  }

  @Query(() => [User])
  async users() {
    return User.find({ relations: ["groups"] });
  }
  @Query(() => User, { nullable: true })
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: MyContext
  ) {
    const user = await User.findOne({ username });
    if (user) {
      const valid = await argon2.verify(user.password, password);
      if (valid) {
        req.session.userId = user.id;
        console.log(req.session.userId);
        return user;
      }
    }
    throw new ApolloError({
      errorMessage: "Incorrect username or password",
    });
  }

  @Mutation(() => User)
  async createUser(
    @Arg("username") username: string,
    @Arg("user_type") user_type: string,
    @Arg("password") password: string,
    @Arg("email") email: string,
    @Arg("groupId") groupId: string,
    @Ctx() { req, res }: MyContext
  ) {
    if (req.session.userId) {
      try {
        const hash = await argon2.hash(password);

        const groups = await Group.find({
          where: {
            id: groupId,
          },
        });

        const user = User.create({
          username,
          user_type,
          email,
          password: hash,
          groups,
        });
        await User.save(user);

        return user;
      } catch {
        throw new ApolloError({
          errorMessage: "Failed to create user",
        });
      }
    } else {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT AUTHENTICATED");
    }
  }
}
