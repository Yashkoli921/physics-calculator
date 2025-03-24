import { users, userCalculations, type User, type InsertUser, type UserCalculation, type InsertCalculation } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveCalculation(calculation: InsertCalculation): Promise<UserCalculation>;
  getUserCalculations(userId: number): Promise<UserCalculation[]>;
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private calculations: Map<number, UserCalculation>;
  currentUserId: number;
  currentCalculationId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.calculations = new Map();
    this.currentUserId = 1;
    this.currentCalculationId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date().toISOString()
    };
    this.users.set(id, user);
    return user;
  }

  async saveCalculation(insertCalculation: InsertCalculation): Promise<UserCalculation> {
    const id = this.currentCalculationId++;
    const calculation: UserCalculation = {
      ...insertCalculation,
      id,
      createdAt: new Date().toISOString()
    };
    this.calculations.set(id, calculation);
    return calculation;
  }

  async getUserCalculations(userId: number): Promise<UserCalculation[]> {
    return Array.from(this.calculations.values()).filter(
      (calculation) => calculation.userId === userId
    );
  }
}

export const storage = new MemStorage();
