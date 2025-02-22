/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import style from '../styles/home.module.scss';
import { Button } from "@heroui/button";
import Item from "@/components/item";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/types/users";
import { getUsers } from "@/API/users";


export default function Home() {

  // --- fetch users ---
  const { data: usersData } = useQuery<IUser[] | undefined>({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });
  // --- fetch users ---

  const [userCount, setUserCount] = useState<number[]>([]);
  const [nUsers, setNUsers] = useState<IUser[] | undefined>();
  
  // --- modify unique user id ---
  const modifyUserId = (user: IUser): IUser => {
    const newId = `${Math.floor(Math.random() * 1000 * user.id) + 1000}${Math.floor(Math.random() * 3) + 1}`;
    return {
        ...user,
        id: Number(newId)
    };
  };
  useEffect(() => {
      if (usersData) {
          setNUsers(usersData.map(modifyUserId));
      }
      console.log(usersData, nUsers);
  }, [usersData]);
  // --- modify unique user id ---



  return (
    <div className={style.home}>
      <div className={style.home_up}>
        <h2>Işçi məlumatları</h2>
        <Button className={style.home_up_btn} 
        onPress={() => setUserCount([...userCount, userCount.length + 1])}
        color="primary" >Əlavə et</Button>
      </div>

      <div className={`${style.home_container} `}>
        <table className={style.home_container_table}>
          <thead>
            <tr>
              <th className='w-10'>Sıra</th>
              <th className='w-96'>İşçi</th>
              <th className='w-96'>Xüsusi qeyd</th>
              <th className='w-24'>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {userCount.map((id, index) => (
                <Item key={index} id={id} users={nUsers} setUserCount={setUserCount}/>
              ))}
          </tbody>
        </table>
      </div>
    </div>






















      

  );
}