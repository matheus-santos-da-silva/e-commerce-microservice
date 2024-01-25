import { UserDTO } from './UserDTO';

export class User {

  private props: UserDTO;

  get id() {
    return this.props.id;
  }

  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get password() {
    return this.props.password;
  }

  constructor(props: UserDTO) {
    this.props = props;
  }

}