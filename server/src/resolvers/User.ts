import { ApolloError } from "apollo-client";
import { AuthenticationError } from "apollo-server-errors";
import * as argon2 from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { COOKIE_NAME } from "../constants";
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

    return await User.findOne({ id: req.session.userId }, { relations: ["groups"] });
  }

  @Query(() => [User])
  async users() {
    return User.find({ relations: ["groups"] });
  }

  @Query(() => [User])
  async userById(@Arg("id") id: string, @Ctx() { req, res }: MyContext) {
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT LOGGED IN");
    }
    return User.find({ relations: ["groups"], where: { id } });
  }

  @Query(() => User, { nullable: true })
  async login(@Arg("username") username: string, @Arg("password") password: string, @Ctx() { req, res }: MyContext) {
    const user = await User.findOne({ username }, { relations: ["groups"] });
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

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

  @Mutation(() => User)
  async createUser(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("email") email: string,
    @Arg("groupId") groupId: string,
    @Arg("isAdministrator") isAdministrator: boolean,
    @Ctx() { req, res }: MyContext
  ) {
    if (req.session.userId) {
      try {
        const hash = await argon2.hash(password);

        let groups: Group[] = [];

        if (groupId !== "") {
          groups = await Group.find({
            where: {
              id: groupId,
            },
          });
        }

        if (groups.length > 0) {
          const user = User.create({
            username,
            email: email === "" ? null : email,
            password: hash,
            groups,
            isAdministrator,
          });
          await User.save(user);
          return user;
        } else {
          const user = User.create({
            username,
            email: email === "" ? null : email,
            password: hash,
            isAdministrator,
          });
          await User.save(user);
          return user;
        }
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

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: string,
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("groupId") groupId: string,
    @Arg("password") password: string,
    @Arg("isAdministrator") isAdministrator: boolean,
    @Ctx() { req, res }: MyContext
  ) {
    if (req.session.userId) {
      try {
        const user = await User.findOne(id);
        if (user) {
          if (groupId) {
            const groups = await Group.find({
              where: {
                id: groupId,
              },
            });

            user.username = username;
            user.email = email;
            user.groups = groups;
            user.isAdministrator = isAdministrator;
          } else {
            user.username = username;
            user.email = email;
            user.groups = null;
            user.isAdministrator = isAdministrator;
          }

          if (password !== "") {
            try {
              const pwd = await argon2.hash(password);
              user.password = pwd;
            } catch {
              throw new ApolloError({
                errorMessage: "Failed to hash password",
              });
            }
          }

          await User.save(user);
        }
        return user;
      } catch {
        throw new ApolloError({
          errorMessage: "Failed to update user",
        });
      }
    } else {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT AUTHENTICATED");
    }
  }

  @Mutation(() => User)
  async editProfile(
    @Arg("id") id: string,
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: MyContext
  ) {
    if (req.session.userId) {
      try {
        const user = await User.findOne(id);
        if (user) {
          user.username = username;
          user.email = email;

          if (password !== "") {
            try {
              const pwd = await argon2.hash(password);
              user.password = pwd;
            } catch {
              throw new ApolloError({
                errorMessage: "Failed to hash password",
              });
            }
          }

          await User.save(user);
        }
        return user;
      } catch {
        throw new ApolloError({
          errorMessage: "Failed to update user",
        });
      }
    } else {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT AUTHENTICATED");
    }
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg("id") id: string,

    @Ctx() { req, res }: MyContext
  ) {
    if (req.session.userId) {
      try {
        await User.delete(id);
        return true;
      } catch {
        throw new ApolloError({
          errorMessage: "Failed to create user",
        });
      } finally {
        return false;
      }
    } else {
      res.statusCode = 401;
      throw new AuthenticationError("USER NOT AUTHENTICATED");
    }
  }
}
