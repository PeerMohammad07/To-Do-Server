import { HttpStatusEnum } from "../enums/statusCodeEnum";
import IHashingService from "../infrastructure/interfaces/IHashingService";
import IjwtService from "../infrastructure/interfaces/IJwtService";
import IUserRepository from "../infrastructure/interfaces/IUserRepository";
import IUserUseCase from "../infrastructure/interfaces/IUserUseCase";
import CustomError from "../infrastructure/utils/customError";


export default class UserUseCase implements IUserUseCase {
  private userRepository: IUserRepository;
  private hashingService: IHashingService;
  private jwtService: IjwtService;

  constructor(userRepository: IUserRepository, hashingService: IHashingService, jwtService: IjwtService) {
    this.userRepository = userRepository;
    this.hashingService = hashingService;
    this.jwtService = jwtService;
  }

  async register(data: { name: string; email: string; password: string }) {
    const userExists = await this.userRepository.checkUserExists(data.email);
    if (userExists) {
      throw new CustomError(HttpStatusEnum.CONFLICT, "User already exists with this email");
    }

    // Hash password
    data.password = await this.hashingService.hashing(data.password);

    // Create user in the database
    const user = await this.userRepository.createUser(data.name, data.email, data.password);
    if (!user) {
      throw new CustomError(HttpStatusEnum.INTERNAL_SERVER_ERROR, "Failed to create user.");
    }

    // Generate tokens
    const payload = { id: user._id, name: user.name };
    const token = this.jwtService.generateToken(payload);
    const refreshToken = this.jwtService.generateRefreshToken(payload);

    return {
      status: true,
      message: "User created successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        refreshToken,
      },
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.checkUserExists(email);

    if (!user) {
      throw new CustomError(HttpStatusEnum.NOT_FOUND, "User Not Found");
    }

    const status = await this.hashingService.compare(password, user.password);
    if (!status) {
      throw new CustomError(HttpStatusEnum.UNAUTHORIZED, "Incorrect Password");
    }

    const payload = { id: user._id, name: user.name };
    const token = this.jwtService.generateToken(payload);
    const refreshToken = this.jwtService.generateRefreshToken(payload);

    return {
      status: true,
      message: "User Login Successfully",
      data: { token, refreshToken, user },
    };
  }
}