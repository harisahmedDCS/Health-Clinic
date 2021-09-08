import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../types/user';
import { Admin } from '../types/admin';

const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users') private UserModel: Model<User>,
    @InjectModel('admin') private AdminModel: Model<Admin>,
  ) {}
  getHelloo(): string {
    return 'haris ahmed';
  }
  async registerUser(
    username: string,
    email: string,
    password: string,
    usertype: string,
    res: any,
  ) {
    try {
      const registers = new this.UserModel({
        name: username,
        email,
        password,
        userType: usertype,
      });
      const salt = await bcrypt.genSalt(10);
      registers.password = await bcrypt.hash(password, salt);
      registers.status = 'true';
      await registers.save();

      const payload = {
        user: {
          id: registers._id,
          status: 'true',
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token: token,
          });
        },
      );
    } catch (error) {
      var resu = `User ${error.keyValue.email} already exists`;
      return resu;
    }
  }
  async authUser(id: string, res: any) {
    try {
      const data = await this.UserModel.findById({ _id: id }).select(
        '-password',
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(400).json({ errors: [{ msg: 'not found users' }] });
    }
  }
  async loginUser(email: string, password: string, res: any, req: any) {
    try {
      let user = await this.UserModel.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] });
      } else {
        const payload = {
          user: {
            id: user._id,
            status: 'true',
          },
        };

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token: token,
            });
          },
        );
      }
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }
  async admin(res: any, email: string, password: string, userType: string) {
    try {
      const getValue = await this.AdminModel.findOne({ email });
      if (getValue.password === password && getValue.userType === userType) {
        const payload = {
          user: {
            id: getValue._id,
            status: 'admin',
          },
        };

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token: token,
            });
          },
        );
      } else {
        return res.status(500).json({
          error: 'invalid credentials',
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'developer error',
      });
    }
  }
}
