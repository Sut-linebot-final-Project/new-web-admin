import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form-mui";
import { TUserForm } from "../../../lib/validations/user";
import { IUser } from "../interface";
import axios from "axios";
import { url } from "../../../service/serviceUrl";

export const useUser = (userId?: number | undefined) => {
  // const user: IUser | undefined = userData.find((data) => data.id === userId);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const form = useForm<IUser>({
    defaultValues: {
      id: user?.id,
      name: user?.name,
      password: user?.password,
      email: user?.email,
      level: user?.level,
    },
    resolver: zodResolver(TUserForm),
  });


  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {

        axios.post(`${url}/user/getuserByID`, { userid: userId })
          .then(response => {
            console.log('user', response.data,)
            // Handle successful response
            setUser(response.data);
          })
          .catch(error => {
            // Handle error
            console.error('Error:', error);
          });
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    form.reset({
      id: user?.id,
      password: user?.password,
      email: user?.email,
      name: user?.name,
      level: user?.level,
    });

  }, [form, name, user, userId,]);




  const onSubmit = async (data: IUser) => {
    if (user?.id) {
      console.log('haveId', data);
      const dataUser = {
        id: user?.id,
        password: data.password,
        email: data.email,
        name: data.name,
        level: data.level,
      }
      axios.post(`${url}/user/updateUser`, dataUser)
        .then(response => {
          console.log('user', response.data,)
          // Handle successful response
          setUser(response.data);
          alert('User updated successfully');
          window.location.reload()
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });
    } else {
      console.log('no id', data);
      axios.post(`${url}/user/createUser`, data)
        .then(response => {
          console.log('user', response.data,)
          // Handle successful response
          alert('User updated successfully');
          window.location.reload()
          // window.reload()
          

        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });
    }


  };

  return { user, form, onSubmit };
};
