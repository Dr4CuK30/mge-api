import { User } from 'src/modules/user/entities/user.entity';

export class ExtendedRequest {
  user: User;
  body: any;
  query: any;
  params: any;
}
