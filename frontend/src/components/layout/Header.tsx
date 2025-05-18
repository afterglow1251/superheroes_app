import { useState } from "react";
import { Layout, Button, Space, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import type { Superhero } from "../../shared/types/superheroes/superheroes.types";
import { NAVIGATE_ROUTES } from "../../shared/constants/routes.constants";
import { superheroService } from "../../shared/services/superhero.service";
import { ManageSuperheroModal } from "../superheroes/ManageSuperheroModal/ManageSuperheroModal";
import { useNotificationStore } from "../../shared/store/useNotificationStore";

const { Header: AntHeader } = Layout;

export function Header() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  const toggleModal = () => setIsCreateModalOpen((prev) => !prev);

  const createSuperheroMutation = useMutation({
    mutationFn: (data: Omit<Superhero, "id">) =>
      superheroService.createSuperhero(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superheroes"] });
      addNotification({
        type: "success",
        message: "Superhero created",
        description: "The new superhero was added successfully.",
      });
      toggleModal();
    },
    onError: (error: Error) => {
      addNotification({
        type: "error",
        message: "Error",
        description: `Failed to add superhero. ${error.message}`,
      });
    },
  });

  const handleCreateSuperhero = async (data: Omit<Superhero, "id">) => {
    await createSuperheroMutation.mutateAsync(data);
  };

  return (
    <>
      <AntHeader className="!px-[56px] !bg-[#f9f9f9] !border-b !border-[#e0e0e0] !sticky !top-0 !z-[999]">
        <Flex align="center" justify="space-between">
          <Button type="text" className="!p-0 !bg-inherit">
            <Link to={NAVIGATE_ROUTES.home()} className="text-xl font-semibold">
              Superheroes
            </Link>
          </Button>

          <Space size="middle">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={toggleModal}
              className="flex items-center"
              loading={createSuperheroMutation.isPending}
            >
              <span className="hidden min-[400px]:inline">Add Superhero</span>
            </Button>
          </Space>
        </Flex>

        <ManageSuperheroModal
          open={isCreateModalOpen}
          toggleModal={toggleModal}
          onOk={handleCreateSuperhero}
          isLoading={createSuperheroMutation.isPending}
        />
      </AntHeader>
    </>
  );
}
