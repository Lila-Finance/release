import { NavLink } from "react-router-dom";
import gitbook from "../assets/gitbook-icon.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = ({ homepage }) => {
  return (
    <div className="md:py-5 py-5 flex items-center justify-between md:flex-row flex-col gap-y-6">
      {/* Left Side */}
      <div
        className={`flex items-center md:justify-start ${
          homepage === true ? "justify-between" : "justify-center"
        } md:flex-nowrap flex-wrap gap-y-4 gap-10`}
      >
        {!homepage ? (
          <NavLink to="/">
            <img
                src="./images/logo.svg"
                alt="site_logo"
                className="mix-blend-color-burn md:w-[75px] lg:w-[100px] xl:w-[125px]"
            />
            </NavLink>
        ) : null}

        {/* social links for homepage */}
        {homepage === true && (
          <div className="flex items-center gap-6 mt-2">
            <a href="https://www.discord.com" target="_blank">
              <i className="fa-brands fa-discord text-lg md:text-[22px]"></i>
            </a>

            <a href="https://www.twitter.com" target="_blank">
              <i className="fa-brands fa-twitter text-lg md:text-[22px]"></i>
            </a>

            <a href="https://www.gitbook.com" target="_blank">
              <img
                src={gitbook}
                alt="gitbook_icon"
                className="w-[22px] md:w-full"
              />
            </a>
          </div>
        )}

        {/* NavLinks */}
        {!homepage && (
          <div className="flex items-center gap-10 navlinks">
            <NavLink to="/pools">
              <p className="text-lg xl:text-xl">Pools</p>
            </NavLink>

            <NavLink to="/portfolio">
              <p className="text-lg xl:text-xl">Portfolio</p>
            </NavLink>

          </div>
        )}
      </div>

      {/* Right side */}
      <div>
          {/* <button className="bg-themeColor lg:text-lg md:py-[10px] py-2 px-4 md:px-5 rounded-full duration-300 hover:-translate-x-3 drop-shadow-buttonShadow font-medium">
            Connect Wallet
          </button> */}
          <ConnectButton.Custom >
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                    authenticationStatus === "authenticated");

                return (
                <div
                    {...(!ready && {
                    "aria-hidden": true,
                    style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                    },
                    })}
                >
                    {(() => {
                    if (!connected) {
                        return (
                        <button
                            onClick={openConnectModal}
                            type="button"
                            className="bg-themeColor lg:text-lg md:py-[10px] py-2 px-4 md:px-5 rounded-full duration-300 hover:-translate-x-3 drop-shadow-buttonShadow font-medium"
                        >
                            Connect Wallet
                        </button>
                        );
                    }

                    if (chain.unsupported) {
                        return (
                        <button
                            onClick={openChainModal}
                            type="button"
                            className="bg-themeColor lg:text-lg md:py-[10px] py-2 px-4 md:px-5 rounded-full duration-300 hover:-translate-x-3 drop-shadow-buttonShadow font-medium"
                        >
                            Wrong network
                        </button>
                        );
                    }

                    return (
                        <div style={{ display: "flex", gap: 12 }}>
                        <button
                            onClick={openChainModal}
                            style={{ display: "flex", alignItems: "center" }}
                            type="button"
                            className="bg-themeColor lg:text-lg md:py-[10px] py-2 px-4 md:px-5 rounded-full duration-300 hover:-translate-x-3 drop-shadow-buttonShadow font-medium"
                        >
                            {chain.hasIcon && (
                            <div
                                style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: "hidden",
                                marginRight: 4,
                                }}
                            >
                                {chain.iconUrl && (
                                <img
                                    alt={chain.name ?? "Chain icon"}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                />
                                )}
                            </div>
                            )}
                            {chain.name}
                        </button>

                        <button
                            onClick={openAccountModal}
                            type="button"
                            className="bg-themeColor lg:text-lg md:py-[10px] py-2 px-4 md:px-5 rounded-full duration-300 hover:-translate-x-3 drop-shadow-buttonShadow font-medium"
                        >
                            {account.displayName}
                        </button>
                        </div>
                    );
                    })()}
                </div>
                );
            }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
};

export default Navbar;
