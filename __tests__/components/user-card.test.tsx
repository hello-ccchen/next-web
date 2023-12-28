/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import UserCard from "@/components/users/user-card";
import { IUser } from "@/interfaces/users/users-interface";

it("renders UserCard component unchanged", () => {
  const mockUser: IUser = {
    id: 0,
    email: "*****",
    first_name: "foo",
    last_name: "bar",
    avatar: "http:image/test/abcde.jpg",
  };
  const { container } = render(<UserCard {...mockUser} />);
  expect(container).toMatchSnapshot();
});
