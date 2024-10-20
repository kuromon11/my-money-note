export type Data = {
  id: string;
  balance_type: string;
  item: string;
  amount: number;
  date: string;
};

export type ReqAndRes = {
  'GET /data': {
    request: null;
    response: {
      data: Data[];
      status: number;
    };
  };
  'POST /data': {
    request: Data;
    response: {
      data: Data;
      status: number;
    };
  };
  'PUT /data': {
    request: Data;
    response: {
      data: Data;
      status: number;
    };
  };
  'DELETE /data': {
    request: null;
    response: {
      status: number;
    };
  };
};
