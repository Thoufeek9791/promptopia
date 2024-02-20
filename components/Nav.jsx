"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
  const {data: session} = useSession();


  const [providers, setProviders] = useState(null)
  const [toggleDropDown, setToggleDropDown] = useState(false)

  useEffect(() => {
    // const setUpProviders = async () => {
    //     const response = await getProviders()
    //     setProviders(response);
    // }

    //**optimized code
    (async () => {
      const res = await getProviders()
      setProviders(res)
    })()

    // setUpProviders()
  },[])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex-center gap-2">
        <Image
          src={"/assets/images/logo.svg"}
          width={30}
          height={30}
          alt="proptopia logo"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* !Desktop Navigiation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile-img"
              />
            </Link>
          </div>
        ) : (
          // empty react fragment
          <>
          {/* console.log('inside else') */}
            {providers &&
              Object.values(providers).map((provider) => 
                ( <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>)
              
              )}
          </>
        )}
      </div>

      {/* Mobile navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile-img"
              onClick={() => {
                setToggleDropDown((prev) => !prev);
              }}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => {
                    () => {
                      setToggleDropDown(false);
                    };
                  }}
                >
                  MY Profile
                </Link>

                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => {
                    () => {
                      setToggleDropDown(false);
                    };
                  }}
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          // empty react fragment
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>;
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
