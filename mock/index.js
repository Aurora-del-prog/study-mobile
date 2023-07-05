import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { faker } from '@faker-js/faker/locale/zh_CN';

// 定义 GraphQL 类型定义
const typeDefs = `
  type UserType {
    id: String!

    """昵称"""
    name: String!

    """简介"""
    desc: String!

    """tel"""
    tel: String!

    """头像"""
    avatar: String
  }

  type Query {
    """使用 ID 查询用户"""
    find(id: String!): UserType!
  }

  type Mutation {
    """新增用户"""
    create(params: UserInput!): Boolean!

    """更新用户"""
    update(id: String!, params: UserInput!): Boolean!

    """删除用户"""
    del(id: String!): Boolean!
  }

  input UserInput {
    """昵称"""
    name: String!

    """简介"""
    desc: String!

    """头像"""
    avatar: String!
  }
`;

// 定义解析器函数
const resolvers = {
  UserType: {
    name: () => faker.name.lastName() + faker.name.firstName(), // 生成随机的姓和名
  },
};

// 定义模拟数据
const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'hello',
};

// 创建 Apollo Server 实例
const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true, // 保留现有的解析器函数
  }),
});

// 启动独立的 Apollo Server
startStandaloneServer(server, { listen: { port: 8888 } });