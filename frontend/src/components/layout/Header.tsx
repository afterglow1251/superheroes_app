import { useState } from "react";
import { Layout, Button, Space, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { Superhero } from "../../shared/types/superheroes/superheroes.types";
import { useAppNotification } from "../../shared/hooks/notifications.hook";
import { NAVIGATE_ROUTES } from "../../shared/constants/routes.constants";
import { superheroService } from "../../shared/services/superhero.service";
import { ManageSuperheroModal } from "../superheroes/ManageSuperheroModal/ManageSuperheroModal";

const { Header: AntHeader } = Layout;

export function Header() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const toggleModal = () => setIsCreateModalOpen((prev) => !prev);

  const queryClient = useQueryClient();

  const { contextHolder, openSuccess, openError } = useAppNotification();

  const handleCreateSuperhero = async (superhero: Omit<Superhero, "id">) => {
    try {
      await superheroService.createSuperhero(superhero);
      queryClient.invalidateQueries({ queryKey: ["superheroes"] });
      openSuccess(
        "Superhero created",
        "The new superhero was added successfully."
      );
      toggleModal();
    } catch (error) {
      openError(
        "Error",
        `Failed to add superhero. ${(error as Error).message}. Try later...`
      );
      throw error;
    }
  };

  return (
    <>
      {contextHolder}
      <AntHeader
        style={{
          padding: "0 56px",
          background: "#f9f9f9",
          borderBottom: "1px solid #e0e0e0",
          position: "sticky",
          top: 0,
          zIndex: 999,
        }}
      >
        <Flex align="center" justify="space-between">
          <Button
            type="text"
            style={{
              padding: 0,
              backgroundColor: "inherit",
            }}
          >
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
            >
              <span className="hidden min-[400px]:inline">Add Superhero</span>
            </Button>
          </Space>
        </Flex>

        <ManageSuperheroModal
          open={isCreateModalOpen}
          toggleModal={toggleModal}
          onOk={handleCreateSuperhero}
        />
      </AntHeader>
    </>
  );
}
