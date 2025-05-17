import { useState, useEffect } from "react";
import { Modal, Form, Input, List, Space, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useFieldErrors } from "../../../shared/hooks/formErrors.hook";
import { isValidUrl } from "../../../shared/utils/checkers.utils";
import { rules } from "./superheroFormRules";
import type { Superhero } from "../../../shared/types/superheroes/superheroes.types";

const { TextArea } = Input;

type ManageSuperheroModalProps = {
  open: boolean;
  toggleModal: () => void;
  onOk: (data: Omit<Superhero, "id">) => void | Promise<void>;
  initialValues?: Superhero;
  mode?: "create" | "edit";
};

export function ManageSuperheroModal({
  open,
  toggleModal,
  onOk,
  initialValues,
  mode = "create",
}: ManageSuperheroModalProps) {
  const [form] = Form.useForm();

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const [superpowers, setSuperpowers] = useState<string[]>([]);
  const [newSuperpower, setNewSuperpower] = useState("");

  const { errors, setFieldError, clearFieldError, clearAllErrors } =
    useFieldErrors<"imageUrl" | "superpower">(["imageUrl", "superpower"]);

  useEffect(() => {
    if (!open) return;

    if (initialValues) {
      const {
        nickname = "",
        real_name = "",
        origin_description = "",
        catch_phrase = "",
        superpowers = [],
        images = [],
      } = initialValues;

      form.setFieldsValue({
        nickname,
        real_name,
        origin_description,
        catch_phrase,
      });

      setSuperpowers(superpowers);
      setImageUrls(images);
    } else {
      resetForm();
    }

    clearAllErrors();
    setNewSuperpower("");
    setNewImageUrl("");
  }, [open, initialValues]);

  const addImageUrl = () => {
    const trimmed = newImageUrl.trim();

    if (!trimmed || !isValidUrl(trimmed)) {
      setFieldError("imageUrl", "Please enter a valid image URL.");
      return;
    }

    if (imageUrls.includes(trimmed)) {
      setFieldError("imageUrl", "This image URL is already added.");
      return;
    }

    setImageUrls([...imageUrls, trimmed]);
    setNewImageUrl("");
    clearFieldError("imageUrl");
  };

  const addSuperpower = () => {
    const trimmed = newSuperpower.trim();

    if (!trimmed) {
      setFieldError("superpower", "Please enter a superpower.");
      return;
    }

    if (superpowers.includes(trimmed)) {
      setFieldError("superpower", "This superpower is already added.");
      return;
    }

    setSuperpowers([...superpowers, trimmed]);
    setNewSuperpower("");
    clearFieldError("superpower");
  };

  const removeSuperpower = (power: string) => {
    setSuperpowers(superpowers.filter((p) => p !== power));
  };

  const removeImageUrl = (url: string) => {
    setImageUrls(imageUrls.filter((u) => u !== url));
  };

  const resetForm = () => {
    form.resetFields();
    setSuperpowers([]);
    setImageUrls([]);
    setNewSuperpower("");
    setNewImageUrl("");
    clearAllErrors();
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const superheroData: Omit<Superhero, "id"> = {
      ...values,
      superpowers,
      images: imageUrls,
    };
    try {
      await onOk(superheroData);
      resetForm();
    } catch {}
  };

  const handleCancel = () => {
    resetForm();
    toggleModal();
  };

  return (
    <Modal
      centered
      title={mode === "edit" ? "Edit Superhero" : "Add Superhero"}
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Save"
      width={800}
    >
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item name="nickname" label="Nickname" rules={rules.nickname}>
          <Input placeholder="Enter nickname" />
        </Form.Item>

        <Form.Item name="real_name" label="Real Name" rules={rules.real_name}>
          <Input placeholder="Enter real name" />
        </Form.Item>

        <Form.Item
          name="origin_description"
          label="Origin Description"
          rules={rules.origin_description}
        >
          <TextArea rows={2} placeholder="Enter origin description" />
        </Form.Item>

        <Form.Item
          label="Superpowers"
          validateStatus={errors.superpower ? "error" : ""}
          help={errors.superpower}
        >
          <Space.Compact className="w-full">
            <Input
              value={newSuperpower}
              onChange={(e) => setNewSuperpower(e.target.value)}
              placeholder="Enter a superpower"
            />
            <Button
              type="primary"
              onClick={addSuperpower}
              icon={<PlusOutlined />}
            >
              Add
            </Button>
          </Space.Compact>
        </Form.Item>

        {superpowers.length > 0 && (
          <div className="mt-4 mb-6">
            <List
              size="small"
              bordered
              dataSource={superpowers}
              renderItem={(power) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeSuperpower(power)}
                    />,
                  ]}
                  key={power}
                >
                  <div className="w-full overflow-hidden text-ellipsis">
                    {power}
                  </div>
                </List.Item>
              )}
            />
          </div>
        )}

        <Form.Item
          name="catch_phrase"
          label="Catch Phrase"
          rules={rules.catch_phrase}
        >
          <Input placeholder="Enter catch phrase" />
        </Form.Item>

        <Form.Item
          label="Images"
          validateStatus={errors.imageUrl ? "error" : ""}
          help={errors.imageUrl}
        >
          <Space.Compact className="w-full">
            <Input
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Enter image URL"
            />
            <Button
              type="primary"
              onClick={addImageUrl}
              icon={<PlusOutlined />}
            >
              Add
            </Button>
          </Space.Compact>
        </Form.Item>

        {imageUrls.length > 0 && (
          <div className="mt-4 mb-8">
            <List
              size="small"
              bordered
              dataSource={imageUrls}
              renderItem={(url) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeImageUrl(url)}
                    />,
                  ]}
                  key={url}
                >
                  <div className="w-full overflow-hidden text-ellipsis">
                    {url}
                  </div>
                </List.Item>
              )}
            />
          </div>
        )}
      </Form>
    </Modal>
  );
}
