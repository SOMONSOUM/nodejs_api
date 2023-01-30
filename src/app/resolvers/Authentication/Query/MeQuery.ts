import { Request, Response } from 'express';
import createKnexContext from '../../../../lib/CreateKnexContext';
import { Me } from '../../../schema/UserSchema';

export const MeQuery = async (req: Request, res: Response) => {
  const knex = createKnexContext().default;
  const { email } = req.params;

  const [me]: Me[] = await knex
    .table('users')
    .select(
      '*',
      'phone_number as phoneNumber',
      'profile_picture as profilePicture',
      'roles.read',
      'roles.write',
      'roles.modify',
      'roles.remove'
    )
    .innerJoin('role_permissions', 'role_permissions.user_id', 'users.id')
    .innerJoin('roles', 'roles.id', 'role_permissions.role_id')
    .where({ email });

  if (me) {
    return res.status(200).json({
      me: {
        id: me?.id,
        email: me?.email,
        username: me?.username,
        fullname: me?.fullname,
        phoneNumber: me?.phoneNumber,
        profilePicture: me?.profilePicture,
        read: me?.read,
        write: me?.write,
        modify: me?.modify,
        remove: me?.remove,
      },
    });
  } else {
    return null;
  }
};
