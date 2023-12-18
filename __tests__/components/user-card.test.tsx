/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import UserCard from "@/components/user-card";
import { IUser } from "@/interfaces/users-interface";

it("renders UserCard component unchanged", () => {
  const mockUser: IUser = {
    id: 0,
    email: "abcd@email.com",
    first_name: "foo",
    last_name: "bar",
    avatar: "http:image/test/abcde.jpg",
  };
  const { container } = render(<UserCard {...mockUser} />);
  expect(container).toMatchSnapshot();
});
