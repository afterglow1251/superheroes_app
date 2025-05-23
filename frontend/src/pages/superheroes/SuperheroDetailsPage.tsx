import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Superhero } from "../../shared/types/superheroes/superheroes.types";
import { Spinner } from "../../shared/components/ui/Spinner";
import { NoData } from "../../shared/components/common/NoData";
import { Image, Divider, Button, Popconfirm, Alert } from "antd";
import { Tag } from "../../shared/components/ui/Tag";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ManageSuperheroModal } from "../../components/superheroes/ManageSuperheroModal/ManageSuperheroModal";
import { NAVIGATE_ROUTES } from "../../shared/constants/routes.constants";
import { superheroService } from "../../shared/services/superhero.service";
import { useNotificationStore } from "../../shared/store/useNotificationStore";

type SuperheroDetailsPageProps = {
  id: number;
};

export function SuperheroDetailsPage({ id }: SuperheroDetailsPageProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();
  const fromUrl: string = location.state?.from || NAVIGATE_ROUTES.home();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addNotification } = useNotificationStore();

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleEdit = () => {
    toggleModal();
  };

  const { data, isPending, error } = useQuery<Superhero>({
    queryKey: ["superhero", id],
    queryFn: () => superheroService.getSuperhero(id),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: () => superheroService.deleteSuperhero(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superheroes"] });
      addNotification({
        type: "success",
        message: "Superhero deleted",
        description: "The superhero was deleted successfully.",
      });
      navigate(fromUrl);
    },
    onError: (error: Error) => {
      addNotification({
        type: "error",
        message: "Error",
        description: `Failed to delete superhero. ${error.message}. Try later...`,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedData: Omit<Superhero, "id">) =>
      superheroService.updateSuperhero(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superhero", id] });
      queryClient.invalidateQueries({ queryKey: ["superheroes"] });
      addNotification({
        type: "success",
        message: "Superhero updated",
        description: "Superhero data was updated successfully.",
      });
      toggleModal();
    },
    onError: (error: Error) => {
      addNotification({
        type: "error",
        message: "Update failed",
        description: `Failed to update superhero. ${error.message}. Try later...`,
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleUpdate = async (updatedData: Omit<Superhero, "id">) => {
    await updateMutation.mutateAsync(updatedData);
  };

  if (isPending) return <Spinner />;
  if (error) {
    return (
      <Alert
        message="Error"
        description={error.message}
        type="error"
        showIcon
      />
    );
  }
  if (!data) return <NoData />;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 text-neutral-800">
      <ManageSuperheroModal
        open={isModalOpen}
        toggleModal={toggleModal}
        onOk={handleUpdate}
        initialValues={data}
        mode="edit"
        isLoading={updateMutation.isPending}
      />

      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          <Image.PreviewGroup items={data.images}>
            <Image
              className="rounded-lg shadow-lg"
              src={data.images[0]}
              alt={`${data.nickname} image`}
            />
          </Image.PreviewGroup>
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-start mb-4">
            <div className="max-w-[calc(100%)]">
              <h1 className="text-3xl font-bold mb-2 break-words whitespace-normal">
                {data.nickname}
              </h1>
              <p className="text-gray-600 italic text-lg break-words whitespace-normal">
                {data.catch_phrase}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleEdit}
                icon={<EditOutlined />}
                className="bg-yellow-400 text-white border-yellow-400 hover:bg-yellow-500 hover:border-yellow-500"
              >
                Edit
              </Button>

              <Popconfirm
                title="Delete the superhero"
                description="Are you sure you want to delete this superhero?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button icon={<DeleteOutlined />} danger>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </div>

          <Divider orientation="left" className="!text-base !border-gray-300">
            Basic information
          </Divider>

          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-lg text-gray-700">Real name</h2>
              <p className="text-gray-900 break-words whitespace-normal">
                {data.real_name}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-lg text-gray-700">Origin</h2>
              <p className="text-gray-900 break-words whitespace-pre-line">
                {data.origin_description}
              </p>
            </div>
          </div>

          <Divider
            orientation="left"
            className="!text-base !border-gray-300 mt-6"
          >
            Superpowers
          </Divider>

          <div className="flex flex-wrap gap-2">
            {data.superpowers.map((power, idx) => (
              <Tag key={idx}>{power}</Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
